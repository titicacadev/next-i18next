import React, { useMemo } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { I18nextProvider } from 'react-i18next'
import type { AppProps as NextJsAppProps } from 'next/app'

import { createConfig } from './config/createConfig'
import createClient from './createClient'
import { abortIfI18nIsNotConfigured } from './check-i18n-configuration'

import { SSRConfig, UserConfig } from './types'

import { i18n as I18NextClient } from 'i18next'
export { Trans, useTranslation, withTranslation } from 'react-i18next'

export let globalI18n: I18NextClient | null = null

export const appWithTranslation = <Props extends NextJsAppProps>(
  WrappedComponent: React.ComponentType<Props>,
  configOverride: UserConfig | null = null,
) => {
  abortIfI18nIsNotConfigured()

  const AppWithTranslation = (props: Props & { pageProps: Props['pageProps'] & SSRConfig }) => {
    const { _nextI18Next } = props.pageProps
    let locale: string | undefined =
      props.router.locale ||
      props.router.query?.lang ||
      _nextI18Next?.initialLocale
    const ns = _nextI18Next?.ns

    const i18n: I18NextClient | null = useMemo(() => {
      if (!_nextI18Next && !configOverride) return null

      const userConfig = configOverride ?? _nextI18Next?.userConfig

      if (!userConfig) {
        throw new Error('appWithTranslation was called without a next-i18next config')
      }

      if (!userConfig?.i18n) {
        throw new Error('appWithTranslation was called without config.i18n')
      }

      if (!userConfig?.i18n?.defaultLocale) {
        throw new Error('config.i18n does not include a defaultLocale property')
      }

      const { initialI18nStore } = _nextI18Next || {}
      const resources =
        configOverride?.resources ? configOverride.resources : initialI18nStore

      if (!locale) locale = userConfig.i18n.defaultLocale

      const instance = createClient({
        ...createConfig({
          ...userConfig,
          lng: locale,
        }),
        lng: locale,
        ns,
        resources,
      }).i18n

      globalI18n = instance

      return instance
    }, [_nextI18Next, locale, configOverride, ns])

    return i18n !== null ? (
      <I18nextProvider
        i18n={i18n}
      >
        <WrappedComponent
          {...props}
        />
      </I18nextProvider>
    ) : (
      <WrappedComponent
        key={locale}
        {...props}
      />
    )
  }

  return hoistNonReactStatics(
    AppWithTranslation,
    WrappedComponent,
  )
}
