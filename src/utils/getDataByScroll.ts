import { RefObject } from "react";

// TODO: 테스트는 아직 못했습니다.
// TODO: ref에 제네릭 타입 지정 어떻게 하죠?

/**
 * 사용자가 얼마나 스크롤했을 때, 다음 데이터를 불러오고 싶은지 설정할 수 있는 함수
 * @param ref 무한 스크롤로 불러오고자 하는 리스트를 담고 있는 부모 태그에 부여한 useRef 속성
 * @param nextCursor 목록 api 조회 결과에 포함된 nextCursor 값
 * @param handleLoadMoreData nextCursor 값을 넣어서 추가 데이터를 불러오는 등의 행동을 구현한 함수
 * @param endpoint 사용자가 어느 정도 스크롤 했을 때, 다음 데이터를 불러오고 싶은지 설정
 * @returns void
 */
export default function getDataByScroll(
	ref: RefObject<HTMLElement>,
	nextCursor: number | undefined,
	handleLoadMoreData: (nextCursor: number) => void,
	endpoint: number = 1,
) {
	if (!nextCursor) return;

	const scrollTop = ref.current?.scrollTop;
	const scrollHeight = ref.current?.scrollHeight;
	const clientHeight = ref.current?.clientHeight;

	if (!scrollTop || !scrollHeight || !clientHeight) return;

	if (Math.abs(scrollHeight - clientHeight - scrollTop) <= endpoint) {
		nextCursor && handleLoadMoreData(nextCursor);
	}
}
