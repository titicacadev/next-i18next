import { existsSync } from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'i18n.d.ts')

if (!existsSync(filePath)) {
  throw new Error('i18n.d.ts 파일이 없습니다. 프로젝트에 국제화 설정을 적용해주세요.')
}
