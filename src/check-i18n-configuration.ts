/* eslint-disable no-console */
export function abortIfI18nIsNotConfigured() {
  if (typeof window !== "undefined" || !process.env.GITHUB_ACTIONS) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import(`${process.cwd()}/i18n.d.ts`).catch((err) => {
    if (err.code === "MODULE_NOT_FOUND") {
      console.error(
        "루트 디렉토리에 i18n.d.ts 파일이 없습니다. 국제화 설정을 적용해주세요!"
      );
      process.exit(1);
    }
  });
}
