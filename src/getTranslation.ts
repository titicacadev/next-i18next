import i18n from 'i18next'

import { globalI18n } from './appWithTranslation'

/**
 * useTranslation 훅을 사용할 수 없는 일반 함수에서
 * TFunction을 사용하고자 할 때 호출하는 함수입니다.
 * @param ns 사용하고자 하는 네임스페이스.
 * TF인 경우 common-web, 그 외 local
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function getTranslation<
  T extends 'common-web' | 'common-admin' | 'local',
>(ns: T) {
  if (!globalI18n) {
    // eslint-disable-next-line no-console
    console.warn('getTranslation error: i18n 인스턴스가 초기화되지 않았습니다.')
    return i18n.getFixedT<T, undefined>(null, ns)
  }

  return globalI18n.getFixedT<T, undefined>(null, ns)
}
