<p align="center"><img width="624" src="https://github.com/4-2-mogazoa/mogazoa/assets/124851297/77792d25-f528-4987-8ef7-bb996eef95fc"></p>

## 프로젝트 소개

> Project-Title : MogaZoa  
> Project-Period : 2024-02-29 ~ 2024-04-04  
> Team : Codeit-Sprint-2-Part4-Team2(김우현,김동빈,이찬주,정성원,황채연)  
> 상품 리뷰 플랫폼

## 주요 기능 소개
- 메인 페이지에서는 상품의 목록과 팔로워 숫자가 높은 유저들의 랭킹을 확인할 수 있습니다.
- 상품 상세 페이지에서는 상품의 상세한 정보와 리뷰를 확인할 수 있고, 비교하기 기능을 사용하여 다른 상품과의 찜, 리뷰 개수를 비교할 수 있습니다.
- 유저 페이지에서는 해당 유저의 활동내역을 확인할 수 있습니다.
- 내 정보 페이지에서는 사용자의 프로필 이미지, 닉네임을 변경할 수 있습니다.

## 🔎 기술 스택

<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">

## 담당 제작 기능
- 상품 상세 페이지 개발
  - 상품 리뷰 생성/수정 모달 기능 구현
  - 상품 찜, 리뷰 좋아요 optimistic Update 기능 구현
  - 리뷰 목록 정렬 및 무한스크롤 기능 구현
  - 카카오톡 공유 기능 구현

## 트러블 슈팅
- 페이지 에러처리<br/>
상품 상세 페이지를 존재하지 않는 상품 번호로 접속하거나 문자열로 입력하여 접속할 경우 빈페이지가 표시 <br/> → 라우터의 query가 NaN으로 확인되거나 서버에서 상품을 불러오지못하여 에러가 발생한경우 홈화면으로 리다이렉트하도록 수정<br/>
[관련 PR 링크](https://github.com/4-2-mogazoa/mogazoa/pull/165)

## 🔗 배포링크

[🔗Link](https://mogazoa4-2.vercel.app/)
