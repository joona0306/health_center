# 전국 보건소 위치 안내 서비스 앱

## 1. Next.js TS 프로젝트 생성

- `npx create-next-app@latest ./ --typescript`
- prettier 설정
  : [참고문서](https://prettier.io/)
  : `yarn add --dev --exact prettier`
  : / .prettierrc.json 파일 생성
  ```json
  {
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80,
    "arrowParens": "avoid",
    "endOfLine": "auto"
  }
  ```
- ESLint 에서 prettier 설정 제어
  : [설정](https://nextjs.org/docs/app/building-your-application/configuring/eslint#prettier)
  : `yarn add --dev eslint-config-prettier`
  : .eslintrc.json
  ```json
  {
    "extends": ["next/core-web-vitals", "prettier"]
  }
  ```
- scss 설정
  : `yarn add sass`

## 2. 깃허브 셋팅

- 저장소명 : health-center
- 설명 : 전국 보건소 위치 안내 서비스
- `git remote add origin https://github.com/아이디/health-center.git`
