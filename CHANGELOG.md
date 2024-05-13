## 13.9.0

- locale을 고려할 때 router.locale을 1순위로 고려하도록 함.

## 13.8.7

- `getTranslation()`을 사용할 때 국제화 설정이 누락된 경우 에러 대신 경고를 띄우도록 수정

- TF에 적용된 국제화 시스템은 app directory가 아닌 pages directory 환경을 타겟으로 구현되어 있습니다. 이로 인해 app directory를 사용하는 프로젝트에서 TF를 사용할 때 TF코드에 적용된 `getTranslation()`에서 i18n 인스턴스가 초기화되지 않았다는 에러가 필연적으로 발생하게 되는데 (app directory에서는 `next-i18next` 라이브러리를 사용하지 않으므로), 이를 어쩔 수 없는 현상으로 간주하고 에러 대신 경고를 띄우도록 수정합니다. 이를 근본적으로 해결하기 위해선 추후 TF에 pages directory와 app directory 환경에서 모두 동작가능한 국제화 시스템을 도입해야 합니다.

## 13.8.6

- 국제화 설정 여부 체크를 `appWithTranslation()` 안에서 수행하도록 함

## 13.8.4

- GITHUB_ACTIONS env 변수가 true일 때만 국제화 설정 여부 체크

## 13.8.2

- 국제화 설정 판별 로직의 process.env === 'production' 조건문 제거

## 13.8.1

- 국제화 설정 여부 판별 로직을 dynamic import 기반으로 변경

## 13.8.0

- i18n.d.ts 파일 존재 여부를 통해 국제화 설정이 되어있는지 판별

## 13.7.1

- [Fix DefaultNamespace import](https://github.com/i18next/next-i18next/pull/2061/files) PR 반영

## 13.7.0

- `getTranslation` 함수의 제네릭 타입에 `common-admin` 추가

## 13.6.0

- `serverSideTranslations`에 `DEFAULT_CONFIG` 옵션 객체 추가

## 13.5.1

- `appWithTranslation`의 Cannot read properties of undefined (reading 'query') 에러 대응

## 13.5.0

- `getTranslation` 함수가 type-safe 하도록 수정

## 13.4.0

- `getTranslation` 함수 추가

## 13.3.0

- `lng` 쿼리 스트링 대신 `lang` 쿼리 스트링을 이용하여 locale을 설정하도록 변경

## 13.2.0

- `appWithTranslation`에서 `lng` 쿼리 스트링으로 locale을 설정할 수 있도록 변경

## 13.1.0

- 패키지 이름을 `next-i18next`에서 `@titicaca/next-i18next`로 변경

## 13.0.0

The v13.0.0 release is a major version to improve stability and general experience.
It comes with 2 easy changes related to installation. Existing code shouldn't be impacted.
Details can be found in the [UPGRADING.md](https://github.com/i18next/next-i18next/blob/master/UPGRADING.md#version-1300) document.

### Breaking changes

- [react-i18next](https://github.com/i18next/react-i18next) and [i18next](https://github.com/i18next/i18next)
  have been moved to peer-dependencies. They must be installed
  in your app ([#1966](https://github.com/i18next/next-i18next/pull/1966))

  ```bash
  # Add react-i18next > 12.0.0 and i18next > 22.0.4 to your app dependencies
  npm install react-i18next i18next --save  # NPM
  yarn add react-i18next i18next            # Yarn
  pnpm add react-i18next i18next --save     # PNPM
  ```

  This might solve issues with duplicates and multiple i18n context instances.
  If you encounter any issue, please read the [Troubleshoot](https://github.com/i18next/next-i18next/blob/master/TROUBLESHOOT.md) doc
  before posting an issue.

- Types augmentations are now handled by i18next instead of react-i18next ([#1997](https://github.com/i18next/next-i18next/pull/1997)).
  See the upgrade [document here](https://github.com/i18next/next-i18next/blob/master/UPGRADING.md#keys-typings).

### New

- Support for NextJs 13 (excluding new experimental layout / rsc)
- Upgrade to [i18next v22](https://github.com/i18next/i18next/releases) and react-i18next v12, see [#1966](https://github.com/i18next/next-i18next/pull/1966)
- Support for node 18 lts [#2017](https://github.com/i18next/next-i18next/pull/2017)

### Fix

- Fix types for appWithTranslation [#1987](https://github.com/i18next/next-i18next/pull/1987)

### New minimum versions

We've dropped support for nextjs < 12.0.0 / react < 17.0.2 ([#1983](https://github.com/i18next/next-i18next/pull/1983))
and node < 14 ([#1974](https://github.com/i18next/next-i18next/pull/1974)).

## 12.1.0

- fix: appWithTranslation re-renders \_app when the locale is changed (#1954)
- feat: introduce onPreInitI18next option (#1960)

## 12.0.1

- fix: fallbackLng if namespaces are undefined (#1943 closes #1941)

## 12.0.0

**Why a major version?**
The following changes could lead to more languages being loaded, which could increase the page size.

- feat: improve fallback language handling (#1927)
- feat: add support for nonExplicitSupportedLngs (#1930)

## 11.3.0

- feat: introduce extraLocales (#1916)

## 11.2.2

- fix: pass namespaces to the client also for custom backends (#1913)

## 11.2.1

- fix: pass namespaces to the client (#1912 closes #1839)

## 11.2.0

- feat: support nested namespace structure (#1911)

## 11.1.1

- fix: remove postinstall script

## 11.1.0

- first release with new project ownership
- update most dependencies
- update docs and example
- feat: support default locale by ignoring it (#1679)

## 11.0.0

**Features:**

- Allow client side translation loading (8132efd)

**Documentation:**

- Link to `react-i18next` config options (422a0f3)
