import fs from 'fs'
import path from 'path'

import { createConfig } from './config/createConfig'
import createClient from './createClient/node'

import { globalI18n } from './appWithTranslation'

import { UserConfig, SSRConfig } from './types'
import { getFallbackForLng, unique } from './utils'

const LOCALE_PATH = './public/static/locales'
const DEFAULT_CONFIG = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'ja', 'zh'],
  },
  localePath:
    typeof window === 'undefined'
      ? path.resolve(LOCALE_PATH)
      : '/public/static/locales',
  // eslint-disable-next-line sort-keys
  defaultNS: 'local',
}
const DEFAULT_CONFIG_PATH = './next-i18next.config.js'

export const serverSideTranslations = async (
  initialLocale: string,
  namespacesRequired: string[] | undefined = undefined,
  configOverride: UserConfig | null = null,
  extraLocales: string[] | false = false,
): Promise<SSRConfig> => {
  if (typeof initialLocale !== 'string') {
    throw new Error('Initial locale argument was not passed into serverSideTranslations')
  }

  let userConfig = configOverride

  if (!userConfig && fs.existsSync(path.resolve(DEFAULT_CONFIG_PATH))) {
    userConfig = await import(path.resolve(DEFAULT_CONFIG_PATH))
  }

  if (userConfig === null) {
    userConfig = DEFAULT_CONFIG
  }

  const config = createConfig({
    ...userConfig,
    lng: initialLocale,
  })

  const {
    localeExtension,
    localePath,
    fallbackLng,
    reloadOnPrerender,
  } = config

  if (reloadOnPrerender) {
    await globalI18n?.reloadResources()
  }

  const { i18n, initPromise } = createClient({
    ...config,
    lng: initialLocale,
  })

  await initPromise

  const initialI18nStore: Record<string, any> = {
    [initialLocale]: {},
  }

  getFallbackForLng(initialLocale, fallbackLng ?? false)
    .concat((extraLocales || []))
    .forEach((lng: string) => {
      initialI18nStore[lng] = {}
    })

  if (!Array.isArray(namespacesRequired)) {
    if (typeof localePath === 'function') {
      throw new Error('Must provide namespacesRequired to serverSideTranslations when using a function as localePath')
    }

    const getLocaleNamespaces = (path: string) =>
      fs.existsSync(path)
        ? fs.readdirSync(path).map(file => file.replace(`.${localeExtension}`, ''))
        : []

    const namespacesByLocale = Object.keys(initialI18nStore)
      .map(locale => getLocaleNamespaces(path.resolve(process.cwd(), `${localePath}/${locale}`)))
      .flat()

    namespacesRequired = unique(namespacesByLocale)
  }

  namespacesRequired.forEach((ns) => {
    for (const locale in initialI18nStore) {
      initialI18nStore[locale][ns] = (
        (i18n.services.resourceStore.data[locale] || {})[ns] || {}
      )
    }
  })

  return {
    _nextI18Next: {
      initialI18nStore,
      initialLocale,
      ns: namespacesRequired,
      userConfig: config.serializeConfig ? userConfig : null,
    },
  }
}
