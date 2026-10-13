/*
  이 파일만 고치면 사이트 내용이 바뀝니다. 날짜는 모두 "2026-10-03"처럼 연-월-일(0 채움)으로 적어요.

  [schedules] 달력과 스케줄 목록에 나오는 일정. 한 줄이 일정 하나입니다.
    date   필수  날짜
    cat    필수  큰 단위: 대학 축제, 공연, 음방, 미니 팬미팅, 팬사인회, 영상통화 팬사인회, 기타 일정, 방송, 라디오, 콘서트, 공항
    sub    선택  작은 단위 (방송 이름, 행사 이름, 업체 이름 등)
    sub2   선택  더 작은 단위 (나라, 앨범, 도시 등)
    sub3   선택  세 번째 단위 (콘서트의 DAY 1, BEAT AX의 DAY 1 등)
    title  선택  달력에 보이는 이름 (공항은 비워 두면 GMP ➔ HND처럼 자동 표시)
    end    선택  여러 날 일정이면 마지막 날짜
    url    선택  일정 링크
    note   선택  목록에서 이름 옆에 작게 나오는 메모
    [공항 전용]
    dir    필수  "출국" 또는 "입국"
    from, to 선택  공항 코드. 둘 다 적으면 GMP ➔ HND로 표시, 하나만 적으면 "입국 PEK"처럼 표시

  [anniversaries] 기념일 칸 (date, title). 달력 날짜 아래에 분홍색으로 나옵니다.

  [items] 사진·영상 항목. 한 줄이 하나입니다.
    date, type("photo" 또는 "video"), members(["성호", ...]) 필수
    url(게시물 링크), thumb(이미지 주소), outfits(착장 태그, 같은 글자로 적으면 같은 태그로 묶임), note 선택
    slots(...) 한 줄은 그 일정의 멤버 6명 x 2칸, 총 12개의 빈 항목을 만듭니다.
    실제 사진을 넣을 때는 해당 slots 줄을 지우고 아래처럼 직접 적으세요.
      { date: "2026-09-29", type: "photo", url: "게시물 링크", thumb: "이미지 주소",
         members: ["성호"], outfits: ["교복"], note: "" },
*/
window.ARCHIVE = (function () {
  const MEMBERS = ["성호", "리우", "재현", "태산", "이한", "운학"];
  const slots = (date, note, type) =>
    MEMBERS.flatMap((m) => [1, 2].map(() => ({ date, type: type || "photo", url: "", thumb: "", members: [m], outfits: [], note })));

  return {
    site: {
      title: "보넥도 아카이브",
      subtitle: "BOYNEXTDOOR 사진과 영상을 날짜, 멤버 조합, 착장별로 모아 봅니다.",
      // 상단에 버튼으로 표시됩니다. 트위터 주소를 본인 계정으로 바꿔 주세요.
      links: [
        { label: "트위터", url: "https://x.com/" }
      ],
      members: MEMBERS
    },

    // 스케줄 분류 참고표 (큰 단위: 작은 단위 → 더 작은 단위). 콘서트의 DAY는 sub3라 표에 없습니다.
    scheduleTypes: {
    "대학 축제": { "경희대 서울캠퍼스": [], "경희대 국제캠퍼스": [], "한국외대": [], "한양여자대학교": [], "한양대 ERICA": [], "동국대": [], "숭실대": [], "고려대": [], "강남대": [], "가천대": [], "연세대": [], "인제대": [], "부산대": [] },
    "공연": { "컴백 쇼케이스": ["[WHO!]", "[WHY]", "[HOW?]", "[AND,]", "[19.99]", "[No Genre]", "[BOYLIFE]", "[THE ACTION]", "[HOME]"], "위버스콘": [], "J-WAVE INSPIRE TOKYO": ["일본"], "메자마시TV": ["일본"], "K Global Heart Dream Awards": [], "GirlsAward": [], "Coke STUDIO SUPERPOP": ["일본"], "영동대로 K-POP 콘서트": [], "TMA": [], "Korea On Stage In London": ["영국"], "Supersound Festival BKK": ["태국"], "Neighbors Con": [], "MAMA": [], "MMA": [], "골든디스크": [], "뮤직뱅크 글로벌 페스티벌": ["일본"], "AAA": [], "가요대전": [], "가요대제전": [], "K-Pop Masterz×KROSS": ["일본"], "BEAT AX": ["Vol.2", "Vol.4", "Vol.9"], "Kstyle PARTY": ["일본"], "KCON": ["홍콩", "일본", "미국"], "도쿄 걸즈 컬렉션": ["일본"], "Mezamashi TV 30th Anniversary Festival": ["일본"], "GOLDEN WAVE": ["대만"], "가오슝 내셔널 스타디움": ["대만"], "열린음악회": [], "WONDERfulDAY": [], "부산원아시아페스티벌": [], "리스닝 파티": ["일본"], "TMEA": ["마카오"], "The MusiQuest": ["일본"], "울산뮤직페스티벌": [], "파리 올림픽 국민대축제": [], "SUMMER SONIC": ["일본", "태국"], "오다이바 모험왕": ["일본"], "PEPSI FESTA": [], "뮤직뱅크 IN 마드리드": ["스페인"], "가요대축제": [], "뮤직 스테이션 슈퍼 라이브": ["일본"], "年間ミュージックアワード": ["일본"], "골드디스크 대상": ["일본"], "이세계페스티벌": [], "FNS 가요제": ["일본"], "Lollapalooza": ["미국"], "Global Spin Live": ["미국"], "INK 콘서트": [], "COLOR IN MUSIC FESTIVAL": [], "KGMA": [], "music × serendipity": ["일본"], "청룡영화상": [], "COUNTDOWN JAPAN": ["일본"], "일본 레코드 대상": ["일본"], "with MUSIC LIVE": ["일본"], "디 어워즈": [], "CDTV": ["일본"], "7-ELEVEN 가오슝 벚꽃축제": ["대만"], "한국PD대상": [], "서울가요대상": [] },
    "음방": { "엠카운트다운": [], "뮤직뱅크": [], "인기가요": [], "더 쇼": [], "쇼챔피언": [], "Venue101": ["일본"], "음악중심": [] },
    "미니 팬미팅": { "뮤직뱅크": [], "인기가요": [], "음악중심": [] },
    "팬사인회": { "뮤직코리아": [], "알라딘": [], "뮤직플랜트": [], "엠투유": [], "YES24": [], "구매자 대상 대면팬싸": ["[WHO!]"], "블루드림미디어": [], "케이타운포유": [], "하이터치회": ["일본"], "사운드웨이브": [], "중국 이즈위": [], "원도어 멤버십": [], "KCON": ["홍콩", "일본", "미국"], "밋앤그릿": ["일본"], "위드뮤": [], "위버스": [], "뮤직아트": [], "중국 대면": ["칭다오", "상하이", "베이징", "광저우"], "조은뮤직": [], "애플뮤직": [], "케이팝머치": [], "비트로드": [], "온라인 토크": ["일본"], "팬플리": [], "케이앤팝스": [], "스페셜 대면": [], "프리미엄 사인회": ["일본"], "닥터지": [], "메이크스타": [], "세이치즈": [], "점프업이엔티": [], "중국 KMS": ["상하이", "칭다오"], "타워레코드": ["일본"], "유플러스": [] },
    "영상통화 팬사인회": { "구매자 대상 영상통화 팬사인회": ["[WHO!]", "[WHY]", "[HOW?]", "[19.99]", "[No Genre]", "[THE ACTION]", "[HOME]", "[HOME: DELUXE]"], "일본": [], "케이타운포유": [], "디어마이뮤즈": [], "스폰지뮤직": [], "(작은 단위 없음)": [], "쇼피": [], "팬플리": [], "위버스": [], "중국 이즈위": [], "멜론 뮤직웨이브": [], "뮤직플랜트": [], "뮤브": [], "중국 KMS": [], "헬로라이브": [] },
    "기타 일정": { "홍대": [], "팝업": ["키엘", "더 현대", "SANDSOUND", "코치"], "런칭 파티": [], "애버랜드": [], "멜론 뮤직웨이브": ["[HOW?]", "[19.99]", "[No Genre]", "['KNOCK ON Vol.1' FINAL LIVE]", "'똑똑똑'", "Boom Boom Boom", "[HOME: DELUXE]"], "영화 행사": ["CGV 연남"], "졸업": [], "시구/시타": [], "개막식": [], "패션쇼": [] },
    "방송": { "CGV BOYNEXTDOOR 2NIGHT": [], "After School Club": [], "&TEAM학園": ["일본"], "후지TV": ["일본"], "CDTV": ["일본"], "음악의 날": ["일본"], "아육대": [], "ENA 차트쇼 케이팝업": [], "바즈리듬02": ["일본"], "뮤직스테이션": ["일본"], "더 시즌즈": [], "THE MUSIC DAY": ["일본"], "with MUSIC": ["일본"], "토모다치 베이스": ["일본"], "매점가요2": [] },
    "라디오": { "두시탈출 컬투쇼": [], "키스 더 라디오": [], "EBS 경청 라디오": [], "STATION Z": [], "메자마시TV": ["일본"], "THE TIME": ["일본"], "STEP ONE": ["일본"], "영재의 친한친구": [], "아이돌 라디오": [], "박소현의 러브게임": [], "DayDay": ["일본"], "박명수의 라디오쇼": [], "배철수의 음악캠프": [], "이은지의 가요광장": [], "웬디의 영스트리트": [], "J-WAVE START LINE": ["일본"], "유인라디오": [] },
    "콘서트": { "KNOCK ON Vol.1": ["한국(인천)", "일본(도쿄)", "일본(나고야)", "일본(오사카)", "일본(센다이)", "일본(후쿠오카)", "일본(요코하마)", "싱가포르", "필리핀(마닐라)", "대만(타이베이)", "홍콩", "인도네시아(자카르타)", "일본(앙코르)", "한국(서울) FINAL"], "KNOCK ON Vol.2": ["한국(서울)", "한국(부산)", "일본(가나가와)", "일본(사가)", "일본(오사카)", "일본(미야기)", "일본(나가노)"] },
    "공항": { "출국": [], "입국": [], "기타": [] }
    },

    // 기념일 칸: 원도어 100일, 생일, 데뷔 N일처럼 스케줄과 따로 적는 정보
    anniversaries: [
    { date: "2024-02-08", title: "원도어(ONEDOOR) 100일 🎉" },
    { date: "2024-03-16", title: "성호 7500일 🎉" },
    { date: "2024-03-24", title: "보이넥스트도어 데뷔 300일 기념 🎉" },
    { date: "2024-08-10", title: "태산 생일 ('GOOD DAY' Special Video 공개) 🎂" },
    { date: "2024-09-04", title: "성호 생일 🎂" },
    { date: "2024-10-10", title: "보이넥스트도어 데뷔 500일 🎉" },
    { date: "2024-10-22", title: "리우 생일 🎂" },
    { date: "2024-11-01", title: "원도어(ONEDOOR) 생일 및 입주 1주년 🎂" },
    { date: "2025-01-18", title: "보이넥스트도어 데뷔 600일 🎉" },
    { date: "2025-04-20", title: "성호 7900일 🎉" },
    { date: "2025-04-28", title: "보이넥스트도어 데뷔 700일 🎉" },
    { date: "2025-07-10", title: "JP 1st Single [AND,] 발매 및 일본 데뷔 1주년 🎉" },
    { date: "2025-07-29", title: "성호 8000일 🎉" },
    { date: "2025-08-06", title: "보이넥스트도어 데뷔 800일 🎉" },
    { date: "2025-09-04", title: "성호 생일 🎂" },
    { date: "2025-09-09", title: "[19.99] 발매 1주년 🎉" },
    { date: "2025-11-01", title: "원도어(ONEDOOR) 생일 🎂" },
    { date: "2025-11-06", title: "성호 8100일 🎉" },
    { date: "2025-11-14", title: "보이넥스트도어 데뷔 900일 🎉" },
    { date: "2025-12-04", title: "재현 생일 🎂" },
    { date: "2026-01-06", title: "'오늘만 I LOVE YOU' 발매 1주년 🎉" },
    { date: "2026-02-14", title: "성호 8200일 🎉" },
    { date: "2026-02-22", title: "보이넥스트도어 데뷔 1000일 🎉" },
    { date: "2026-03-14", title: "'이렇게 좋아해 본 적이 없어요' 발매 1주년 🎉" },
    { date: "2026-04-15", title: "HOW? 발매 2주년 🎉" },
    { date: "2026-05-13", title: "No Genre 발매 1주년 🎉" },
    { date: "2026-05-25", title: "성호 8300일 🎉" },
    { date: "2026-05-30", title: "보이넥스트도어 데뷔 3주년 🎉" },
    { date: "2026-06-02", title: "BOYNEXTDOOR 1100일 🎉" },
    { date: "2026-07-10", title: "<AND,> 발매 2주년 🎉" },
    { date: "2026-07-10", title: "일본 데뷔 2주년 🎉" },
    { date: "2026-08-10", title: "태산 생일 🎂" },
    { date: "2026-09-04", title: "성호 생일 🎂" }
    ],

    schedules: [
    { date: "2023-05-30", cat: "공연", sub: "컴백 쇼케이스", sub2: "[WHO!]", title: "[WHO!] 컴백 쇼케이스" },
    { date: "2023-06-01", cat: "음방", sub: "엠카운트다운", title: "엠카" },
    { date: "2023-06-02", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2023-06-02", cat: "미니 팬미팅", sub: "뮤직뱅크", title: "뮤뱅 미니팬미팅" },
    { date: "2023-06-04", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[WHO!]", title: "[WHO!] 구매자 대상 영상통화 팬사인회" },
    { date: "2023-06-08", cat: "음방", sub: "엠카운트다운", title: "엠카" },
    { date: "2023-06-09", cat: "팬사인회", sub: "뮤직코리아", title: "뮤직코리아 팬싸" },
    { date: "2023-06-10", cat: "공연", sub: "위버스콘", title: "위버스콘" },
    { date: "2023-06-11", cat: "팬사인회", sub: "알라딘", title: "알라딘 팬싸" },
    { date: "2023-06-13", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2023-06-13", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤플 팬싸" },
    { date: "2023-06-14", cat: "영상통화 팬사인회", sub: "일본", title: "일본 영통팬싸" },
    { date: "2023-06-15", cat: "팬사인회", sub: "엠투유", title: "엠투유 팬싸" },
    { date: "2023-06-16", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤플 팬싸" },
    { date: "2023-06-16", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-06-17", cat: "팬사인회", sub: "YES24", title: "에스24 팬싸" },
    { date: "2023-06-18", cat: "팬사인회", sub: "구매자 대상 대면팬싸", sub2: "[WHO!]", title: "[WHO!] 구매자 대상 대면팬싸" },
    { date: "2023-06-19", cat: "라디오", sub: "EBS 경청 라디오", title: "EBS 경청 라디오" },
    { date: "2023-06-22", cat: "음방", sub: "엠카운트다운", title: "엠카" },
    { date: "2023-06-23", cat: "영상통화 팬사인회", sub: "케이타운포유", title: "케타포유 영통팬싸" },
    { date: "2023-06-24", cat: "라디오", sub: "STATION Z", title: "STATION Z 라디오" },
    { date: "2023-06-25", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2023-06-25", cat: "미니 팬미팅", sub: "인기가요", title: "인가미팬" },
    { date: "2023-06-25", cat: "영상통화 팬사인회", sub: "디어마이뮤즈", title: "디마뮤 영통" },
    { date: "2023-06-30", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2023-07-08", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-07-15", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-07-16", cat: "공항", dir: "출국", from: "GMP", to: "HND" },
    { date: "2023-07-17", cat: "공연", sub: "J-WAVE INSPIRE TOKYO", sub2: "일본", title: "일본 도쿄 J-WAVE INSPIRE TOKYO 공연" },
    { date: "2023-07-18", cat: "공항", dir: "입국", from: "HND", to: "GMP" },
    { date: "2023-07-18", cat: "라디오", sub: "메자마시TV", sub2: "일본", title: "일본 메자마시TV 라디오" },
    { date: "2023-07-18", cat: "공연", sub: "메자마시TV", sub2: "일본", title: "일본 메자마시TV 공연" },
    { date: "2023-07-18", cat: "라디오", sub: "THE TIME", sub2: "일본", title: "THE TIME 라디오" },
    { date: "2023-07-18", cat: "라디오", sub: "STEP ONE", sub2: "일본", title: "STEP ONE 라디오" },
    { date: "2023-07-22", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-07-23", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2023-07-24", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2023-07-29", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-08-05", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-08-10", cat: "공연", sub: "K Global Heart Dream Awards", title: "K Global Heart Dream Awards" },
    { date: "2023-08-12", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-08-15", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-08-17", cat: "음방", sub: "엠카운트다운", title: "엠카" },
    { date: "2023-08-19", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-08-20", cat: "라디오", sub: "EBS 경청 라디오", title: "EBS 경청 라디오" },
    { date: "2023-08-26", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-09-04", cat: "공연", sub: "컴백 쇼케이스", sub2: "[WHY]", title: "[WHY] 컴백 쇼케이스" },
    { date: "2023-09-04", cat: "방송", sub: "CGV BOYNEXTDOOR 2NIGHT", title: "CGV BOYNEXTDOOR 2NIGHT 방송" },
    { date: "2023-09-07", cat: "라디오", sub: "영재의 친한친구", title: "영재의 친한친구 라디오" },
    { date: "2023-09-08", cat: "음방", sub: "뮤직뱅크", title: "뮤뱅" },
    { date: "2023-09-08", cat: "미니 팬미팅", sub: "뮤직뱅크", title: "뮤뱅미팬" },
    { date: "2023-09-08", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-09-10", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[WHY]", title: "[WHY] 구매자 대상 영통 팬싸" },
    { date: "2023-09-11", cat: "라디오", sub: "아이돌 라디오", title: "아이돌 라디오" },
    { date: "2023-09-11", cat: "기타 일정", sub: "홍대", title: "홍대" },
    { date: "2023-09-12", cat: "음방", sub: "더 쇼", title: "더쇼" },
    { date: "2023-09-13", cat: "음방", sub: "쇼챔피언", title: "쇼챔 음방" },
    { date: "2023-09-13", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-09-14", cat: "대학 축제", sub: "경희대 서울캠퍼스", title: "경희대 서울캠퍼스" },
    { date: "2023-09-15", cat: "음방", sub: "뮤직뱅크", title: "뮤뱅출근퇴근" },
    { date: "2023-09-15", cat: "라디오", sub: "STATION Z", title: "STATION Z 라디오" },
    { date: "2023-09-15", cat: "팬사인회", sub: "YES24", title: "에스24 팬싸" },
    { date: "2023-09-16", cat: "영상통화 팬사인회", sub: "디어마이뮤즈", title: "디어마이뮤즈 영상통화 팬사인회" },
    { date: "2023-09-16", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-09-17", cat: "팬사인회", sub: "알라딘", title: "알라딘 팬싸" },
    { date: "2023-09-18", cat: "팬사인회", sub: "블루드림미디어", title: "블루드림미디어 팬싸" },
    { date: "2023-09-19", cat: "음방", sub: "더 쇼", title: "더쇼" },
    { date: "2023-09-19", cat: "방송", sub: "After School Club", title: "After School Club 방송" },
    { date: "2023-09-20", cat: "기타 일정", sub: "팝업", sub2: "키엘", title: "키엘 팝업 스토어" },
    { date: "2023-09-20", cat: "대학 축제", sub: "경희대 국제캠퍼스", title: "경희대 국제캠퍼스" },
    { date: "2023-09-21", cat: "대학 축제", sub: "한국외대", title: "한국외대" },
    { date: "2023-09-22", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2023-09-22", cat: "팬사인회", sub: "뮤직코리아", title: "뮤직코리아 팬싸" },
    { date: "2023-09-23", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-09-24", cat: "팬사인회", sub: "케이타운포유", title: "케이타운포유 팬싸" },
    { date: "2023-09-26", cat: "영상통화 팬사인회", sub: "스폰지뮤직", title: "스폰지뮤직 영상통화 팬싸인회" },
    { date: "2023-09-27", cat: "음방", sub: "쇼챔피언", title: "쇼챔" },
    { date: "2023-09-29", cat: "공항", dir: "출국", from: "GMP", to: "HND" },
    { date: "2023-09-30", cat: "공연", sub: "GirlsAward", title: "GirlsAward" },
    { date: "2023-10-01", cat: "팬사인회", sub: "하이터치회", sub2: "일본", title: "일본 [WHY..] 하이터치회" },
    { date: "2023-10-07", cat: "음방", sub: "Venue101", sub2: "일본", title: "일본 Venue101 (베뉴 원오원) 음방" },
    { date: "2023-10-07", cat: "공연", sub: "Coke STUDIO SUPERPOP", sub2: "일본", title: "Coke STUDIO SUPERPOP 공연" },
    { date: "2023-10-08", cat: "공항", title: "공항?" },
    { date: "2023-10-08", cat: "공연", sub: "영동대로 K-POP 콘서트", title: "영동대로 K-POP 콘서트" },
    { date: "2023-10-10", cat: "공연", sub: "TMA", title: "더팩트 뮤직 어워즈 (TMA)" },
    { date: "2023-10-13", cat: "팬사인회", sub: "엠투유", title: "엠투유 팬싸" },
    { date: "2023-10-14", cat: "영상통화 팬사인회", title: "[WHY..] 온라인 토크 (일본)" },
    { date: "2023-10-15", cat: "공항", title: "공항" },
    { date: "2023-10-15", cat: "팬사인회", sub: "사운드웨이브", title: "사운드웨이브 팬싸" },
    { date: "2023-10-16", cat: "영상통화 팬사인회", sub: "디어마이뮤즈", title: "디어마이뮤즈 영통팬싸" },
    { date: "2023-10-20", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-10-21", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-10-22", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2023-10-23", cat: "영상통화 팬사인회", sub: "디어마이뮤즈", title: "디어마이뮤즈 영통팬싸" },
    { date: "2023-10-28", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2023-11-06", cat: "공항", dir: "출국", from: "ICN", to: "LHR" },
    { date: "2023-11-08", cat: "공연", sub: "Korea On Stage In London", sub2: "영국", title: "Korea On Stage In London" },
    { date: "2023-11-09", cat: "공연", sub: "Korea On Stage In London", sub2: "영국", title: "Korea On Stage In London" },
    { date: "2023-11-11", cat: "공항", dir: "입국", from: "LHR", to: "ICN" },
    { date: "2023-11-12", cat: "공항", dir: "입국", from: "LHR", to: "ICN" },
    { date: "2023-11-16", cat: "음방", sub: "엠카운트다운", title: "엠카" },
    { date: "2023-11-17", cat: "공항", dir: "출국", from: "ICN", to: "BKK" },
    { date: "2023-11-18", cat: "공연", sub: "Supersound Festival BKK", sub2: "태국", title: "Supersound Festival bkk(방콕콘서트)" },
    { date: "2023-11-19", cat: "공항", dir: "입국", from: "BKK", to: "ICN" },
    { date: "2023-11-23", cat: "공연", sub: "Korea On Stage In London", sub2: "영국", title: "코리아 온 스테이지 인 런던" },
    { date: "2023-11-24", cat: "공항", dir: "출국", from: "GMP" },
    { date: "2023-11-24", cat: "음방", sub: "뮤직뱅크", title: "뮤뱅" },
    { date: "2023-11-25", cat: "공연", sub: "Neighbors Con", title: "Neighbors Con 공연" },
    { date: "2023-11-28", cat: "공연", sub: "MAMA", title: "MAMA AWARDS 개인 공연" },
    { date: "2023-11-29", cat: "공연", sub: "MAMA", title: "MAMA RED CARPET" },
    { date: "2023-11-30", cat: "공항", title: "공항" },
    { date: "2023-12-02", cat: "공연", sub: "MMA", title: "MMA 멜론 뮤직 어워드" },
    { date: "2023-12-03", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2023-12-04", cat: "공연", sub: "골든디스크", title: "제 38회 골든디스크어워즈" },
    { date: "2023-12-09", cat: "공연", sub: "뮤직뱅크 글로벌 페스티벌", sub2: "일본", title: "일본 뮤직뱅크 글로벌 페스티벌" },
    { date: "2023-12-10", cat: "공항", title: "공항" },
    { date: "2023-12-13", cat: "공항", title: "공항" },
    { date: "2023-12-14", cat: "공연", sub: "AAA", title: "AAA ( 아시아 아티스트 어워즈 )" },
    { date: "2023-12-15", cat: "기타 일정", sub: "런칭 파티", title: "<Galaxy S23 FE> LAUNCHING PARTY" },
    { date: "2023-12-16", cat: "공항", dir: "출국", from: "ICN", to: "TAO" },
    { date: "2023-12-16", cat: "팬사인회", sub: "중국 이즈위", title: "이즈위 대면 팬사인회" },
    { date: "2023-12-18", cat: "기타 일정", sub: "애버랜드", title: "애버랜드" },
    { date: "2023-12-23", cat: "공연", sub: "가요대전", title: "가요대전" },
    { date: "2023-12-25", cat: "공연", sub: "가요대전", title: "가요대전" },
    { date: "2023-12-29", cat: "공연", sub: "가요대제전", title: "가요대제전" },
    { date: "2023-12-31", cat: "공연", sub: "가요대제전", title: "가요대제전" },
    { date: "2024-01-01", cat: "공연", sub: "가요대제전", title: "가요대제전" },
    { date: "2024-01-02", cat: "공연", sub: "K-Pop Masterz×KROSS", sub2: "일본", title: "K-Pop Masterz×KROSS vol.3 공연", note: "나고야에서 개최" },
    { date: "2024-01-05", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운 음방" },
    { date: "2024-01-06", cat: "공연", sub: "골든디스크", title: "골든디스크 GDA" },
    { date: "2024-01-11", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운 음방" },
    { date: "2024-01-16", cat: "공연", sub: "BEAT AX", sub2: "Vol.2", sub3: "DAY 1", title: "BEAT AX Vol.2' (DAY1) 공연" },
    { date: "2024-01-17", cat: "공연", sub: "BEAT AX", sub2: "Vol.2", sub3: "DAY 2", title: "BEAT AX Vol.2' (DAY2) 공연" },
    { date: "2024-02-04", cat: "팬사인회", sub: "원도어 멤버십", title: "원도어 멤버십 런칭 기념 팬사인회" },
    { date: "2024-02-10", cat: "방송", sub: "&TEAM학園", sub2: "일본", title: "일본 닛폰TV <&TEAM학園 2学期> 방송" },
    { date: "2024-02-24", cat: "공연", sub: "Kstyle PARTY", sub2: "일본", title: "일본 KSTYLE PARTY 공연" },
    { date: "2024-02-28", cat: "공연", sub: "KCON", sub2: "홍콩", title: "KCON HONG KONG" },
    { date: "2024-02-29", cat: "공항", dir: "출국", from: "ICN" },
    { date: "2024-03-02", cat: "공연", sub: "도쿄 걸즈 컬렉션", sub2: "일본", title: "일본 제38회 마이나비 도쿄 걸즈 컬렉션 2024 S/S 공연" },
    { date: "2024-03-14", cat: "팬사인회", sub: "원도어 멤버십", title: "원도어 멤버십 오픈 기념 팬사인회" },
    { date: "2024-03-15", cat: "공항", dir: "출국", title: "대만 출국" },
    { date: "2024-03-16", cat: "공연", sub: "Mezamashi TV 30th Anniversary Festival", sub2: "일본", title: "Mezamashi TV 30th Anniversary Festival 공연" },
    { date: "2024-03-21", cat: "방송", sub: "후지TV", sub2: "일본", title: "일본 후지TV" },
    { date: "2024-03-28", cat: "방송", sub: "후지TV", sub2: "일본", title: "일본 후지TV" },
    { date: "2024-03-29", cat: "공항", dir: "출국", title: "홍콩 출국" },
    { date: "2024-03-30", cat: "공연", sub: "KCON", sub2: "홍콩", title: "<KCON HONG KONG> 공연" },
    { date: "2024-03-30", cat: "팬사인회", sub: "KCON", sub2: "홍콩", title: "밋앤그릿(MEET & GREET) 팬싸" },
    { date: "2024-03-31", cat: "공연", sub: "KCON", sub2: "홍콩", title: "<KCON HONG KONG> 공연" },
    { date: "2024-04-13", cat: "공연", sub: "GOLDEN WAVE", sub2: "대만", title: "GOLDEN WAVE in TAIWAN 공연" },
    { date: "2024-04-15", cat: "공연", sub: "컴백 쇼케이스", sub2: "[HOW?]", title: "[HOW?] 컴백 쇼케이스 (BOYNEXTDOOR TONI3HT)" },
    { date: "2024-04-16", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2024-04-16", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "[HOW?]", title: "[HOW?] 멜론 리스닝파티" },
    { date: "2024-04-17", cat: "라디오", sub: "키스 더 라디오", title: "키스 더 라디오" },
    { date: "2024-04-18", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운 컴백" },
    { date: "2024-04-19", cat: "영상통화 팬사인회", sub: "쇼피", title: "쇼피 영통 팬싸" },
    { date: "2024-04-19", cat: "기타 일정", sub: "팝업", sub2: "더 현대", title: "더 현대 팝업" },
    { date: "2024-04-20", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2024-04-20", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[HOW?]", title: "[HOW?] 구매자 대상 영상통화 팬사인회" },
    { date: "2024-04-21", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2024-04-21", cat: "라디오", sub: "박소현의 러브게임", title: "<박소현의 러브게임>" },
    { date: "2024-04-22", cat: "공연", sub: "가오슝 내셔널 스타디움", sub2: "대만", title: "대만 가오슝 내셔널 스타디움 공연" },
    { date: "2024-04-23", cat: "음방", sub: "더 쇼", title: "SBS M <더 쇼> 음방" },
    { date: "2024-04-24", cat: "음방", sub: "쇼챔피언", title: "<쇼챔피언> 음방" },
    { date: "2024-04-24", cat: "라디오", sub: "아이돌 라디오", title: "<아이돌 라디오>" },
    { date: "2024-04-25", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-04-26", cat: "음방", sub: "뮤직뱅크", title: "<뮤직뱅크> 음방" },
    { date: "2024-04-26", cat: "음방", sub: "뮤직뱅크", title: "뮤뱅출근" },
    { date: "2024-04-26", cat: "팬사인회", sub: "YES24", title: "Y24 팬사인회" },
    { date: "2024-04-27", cat: "음방", sub: "음악중심", title: "<음악중심> 음방" },
    { date: "2024-04-27", cat: "팬사인회", sub: "엠투유", title: "엠투유 팬사인회, M2U 팬싸" },
    { date: "2024-04-28", cat: "음방", sub: "인기가요", title: "인기가요음방" },
    { date: "2024-04-28", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤직플랜트 팬사인회" },
    { date: "2024-04-29", cat: "팬사인회", sub: "뮤직코리아", title: "뮤직코리아 팬사인회" },
    { date: "2024-04-30", cat: "영상통화 팬사인회", sub: "일본", title: "일본 영통 팬싸인회" },
    { date: "2024-05-05", cat: "음방", sub: "인기가요", title: "인가" },
    { date: "2024-05-05", cat: "영상통화 팬사인회", sub: "팬플리", title: "팬플리 영상통화 팬사인회" },
    { date: "2024-05-06", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿" },
    { date: "2024-05-07", cat: "음방", sub: "더 쇼", title: "더쇼" },
    { date: "2024-05-07", cat: "공연", sub: "열린음악회", title: "열린음악회" },
    { date: "2024-05-09", cat: "공항", title: "GMP" },
    { date: "2024-05-10", cat: "공연", sub: "KCON", sub2: "일본", title: "KCON 공연" },
    { date: "2024-05-10", cat: "팬사인회", sub: "KCON", sub2: "일본", title: "M&G" },
    { date: "2024-05-13", cat: "기타 일정", sub: "팝업", sub2: "SANDSOUND", title: "SANDSOUND 팝업" },
    { date: "2024-05-17", cat: "공항", dir: "출국", from: "ICN", to: "PEK" },
    { date: "2024-05-17", cat: "팬사인회", sub: "중국 이즈위", title: "이즈위 대면" },
    { date: "2024-05-18", cat: "공항", dir: "입국", from: "PEK" },
    { date: "2024-05-18", cat: "팬사인회", sub: "중국 이즈위", title: "이즈위 대면" },
    { date: "2024-05-22", cat: "팬사인회", sub: "위드뮤", title: "위드뮤" },
    { date: "2024-05-24", cat: "공항", title: "GMP" },
    { date: "2024-05-25", cat: "팬사인회", sub: "사운드웨이브", title: "SW부산팬사", note: "부산" },
    { date: "2024-06-01", cat: "공연", sub: "WONDERfulDAY", sub3: "DAY 1", title: "WONDERfulDAY (DAY1)" },
    { date: "2024-06-02", cat: "공연", sub: "WONDERfulDAY", sub3: "DAY 2", title: "WONDERfulDAY (DAY2)" },
    { date: "2024-06-04", cat: "팬사인회", sub: "위버스", title: "위버스 팬사인회 WVS 팬싸" },
    { date: "2024-06-07", cat: "공항", title: "공항" },
    { date: "2024-06-07", cat: "팬사인회", sub: "뮤직아트", title: "뮤직아트 팬싸" },
    { date: "2024-06-08", cat: "공연", sub: "부산원아시아페스티벌", title: "부산원아시아페스티벌(BOF) 원아페 공연" },
    { date: "2024-06-15", cat: "공연", sub: "위버스콘", title: "위버스콘 공연" },
    { date: "2024-06-18", cat: "공항", dir: "출국", from: "GMP", to: "HND" },
    { date: "2024-06-19", cat: "공연", sub: "리스닝 파티", sub2: "일본", title: "공연", note: "멜론 리스닝 파티와는 다른 일정" },
    { date: "2024-06-25", cat: "공항", dir: "입국", from: "HND", to: "GMP" },
    { date: "2024-06-26", cat: "영상통화 팬사인회", sub: "위버스", title: "[HOW?] 위버스 영상통화 팬사인회 (2회차)" },
    { date: "2024-06-28", cat: "공항", dir: "출국", from: "ICN", to: "NRT" },
    { date: "2024-06-29", cat: "공항", dir: "입국", to: "ICN" },
    { date: "2024-06-29", cat: "공연", sub: "BEAT AX", sub2: "Vol.4", title: "BEAT AX Vol.4 공연" },
    { date: "2024-07-07", cat: "방송", sub: "CDTV", sub2: "일본", title: "일본 TBS 《CDTV 라이브! 라이브!》" },
    { date: "2024-07-08", cat: "방송", sub: "CDTV", sub2: "일본", title: "일본 TBS 《CDTV 라이브! 라이브!》" },
    { date: "2024-07-09", cat: "공항", dir: "출국", from: "GMP", to: "HND" },
    { date: "2024-07-10", cat: "라디오", sub: "DayDay", sub2: "일본", title: "일본 DayDay" },
    { date: "2024-07-10", cat: "공연", sub: "컴백 쇼케이스", sub2: "[AND,]", title: "[AND,] 컴백 쇼케이스" },
    { date: "2024-07-11", cat: "공항", dir: "입국", from: "HND", to: "GMP" },
    { date: "2024-07-13", cat: "방송", sub: "음악의 날", sub2: "일본", title: "일본 TBS 《음악의 날 2024》 방송" },
    { date: "2024-07-13", cat: "공연", sub: "J-WAVE INSPIRE TOKYO", sub2: "일본", title: "J-WAVE INSPIRE TOKYO 공연" },
    { date: "2024-07-15", cat: "공연", sub: "J-WAVE INSPIRE TOKYO", sub2: "일본", title: "J-WAVE SPECIAL INSPIRE TO THE NEXT" },
    { date: "2024-07-19", cat: "공연", sub: "TMEA", sub2: "마카오", title: "중국 마카오 5th TMEA 공연" },
    { date: "2024-07-21", cat: "공항", dir: "입국", from: "HND", to: "GMP" },
    { date: "2024-07-21", cat: "공연", sub: "The MusiQuest", sub2: "일본", title: "일본 The MusiQuest 공연" },
    { date: "2024-07-26", cat: "공연", sub: "KCON", sub2: "미국", title: "미국 LA KCON 공연" },
    { date: "2024-07-27", cat: "공연", sub: "KCON", sub2: "미국", title: "미국 LA KCON 공연" },
    { date: "2024-07-27", cat: "팬사인회", sub: "KCON", sub2: "미국", title: "미국 LA KCON MEET & GREET" },
    { date: "2024-08-03", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 AND, 밋앤그릿 팬싸인회" },
    { date: "2024-08-04", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 AND, 밋앤그릿 팬싸인회" },
    { date: "2024-08-05", cat: "방송", sub: "아육대", title: "아육대 사전녹화" },
    { date: "2024-08-09", cat: "팬사인회", sub: "중국 대면", sub2: "칭다오", title: "중국 칭다오 팬사인회" },
    { date: "2024-08-10", cat: "팬사인회", sub: "중국 대면", sub2: "칭다오", title: "중국 칭다오 팬사인회" },
    { date: "2024-08-12", cat: "공연", sub: "울산뮤직페스티벌", title: "울산 서머 페스티벌 공연" },
    { date: "2024-08-16", cat: "공연", sub: "파리 올림픽 국민대축제", title: "2024 파리 올림픽 기념 국민대축제 <파리의 영웅들>공연" },
    { date: "2024-08-18", cat: "공연", sub: "SUMMER SONIC", sub2: "일본", title: "일본 SUMMER SONIC TOKYO 공연" },
    { date: "2024-08-20", cat: "공연", sub: "오다이바 모험왕", sub2: "일본", title: "일본 도쿄 오다이바 모험왕 - 메자마시 라이브 공연" },
    { date: "2024-08-22", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-08-23", cat: "공항", dir: "출국", from: "ICN", to: "BKK" },
    { date: "2024-08-24", cat: "공연", sub: "SUMMER SONIC", sub2: "태국", title: "태국 방콕 SUMMER SONIC BANGKOK 공연" },
    { date: "2024-08-29", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-09-05", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-09-06", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크 출퇴근" },
    { date: "2024-09-07", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2024-09-07", cat: "미니 팬미팅", sub: "음악중심", title: "음중 미니 팬미팅" },
    { date: "2024-09-08", cat: "기타 일정", sub: "영화 행사", sub2: "CGV 연남", title: "CGV 연남 <마이 아티 필름>" },
    { date: "2024-09-08", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2024-09-09", cat: "공연", sub: "컴백 쇼케이스", sub2: "[19.99]", title: "[19.99] 컴백 쇼케이스" },
    { date: "2024-09-10", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "[19.99]", title: "[19.99] 멜론 리스닝 파티" },
    { date: "2024-09-10", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2024-09-10", cat: "공연", sub: "열린음악회", title: "열린음악회 공연" },
    { date: "2024-09-11", cat: "대학 축제", sub: "한양여자대학교", title: "한양여자대학교 공연" },
    { date: "2024-09-12", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-09-13", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2024-09-13", cat: "팬사인회", sub: "뮤직아트", title: "뮤직아트 팬사인회" },
    { date: "2024-09-14", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2024-09-14", cat: "미니 팬미팅", sub: "음악중심", title: "음중 미팬" },
    { date: "2024-09-14", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[19.99]", title: "[19.99] 구매자 영상통화 팬사인회" },
    { date: "2024-09-18", cat: "라디오", sub: "아이돌 라디오", title: "아이돌라디오 라디오" },
    { date: "2024-09-20", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2024-09-20", cat: "팬사인회", sub: "YES24", title: "[19.99] YES24 팬사인회" },
    { date: "2024-09-21", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2024-09-22", cat: "음방", sub: "인기가요", title: "인기가요 사녹", note: "사전녹화" },
    { date: "2024-09-22", cat: "공연", sub: "PEPSI FESTA", title: "PEPSI FESTA 공연" },
    { date: "2024-09-23", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤직플랜트 팬사인회" },
    { date: "2024-09-25", cat: "팬사인회", sub: "조은뮤직", title: "조은뮤직 팬사인회" },
    { date: "2024-09-26", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2024-09-27", cat: "팬사인회", sub: "애플뮤직", title: "애플뮤직 팬사인회" },
    { date: "2024-09-28", cat: "팬사인회", sub: "위드뮤", title: "위드뮤 팬사인회" },
    { date: "2024-09-29", cat: "공연", sub: "열린음악회", title: "<열린음악회> 공연" },
    { date: "2024-10-01", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿" },
    { date: "2024-10-05", cat: "팬사인회", sub: "케이타운포유", title: "케이타운포유 팬사인회" },
    { date: "2024-10-09", cat: "팬사인회", sub: "케이팝머치", title: "케이팝머치 팬사인회" },
    { date: "2024-10-11", cat: "방송", sub: "ENA 차트쇼 케이팝업", title: "<ENA 차트쇼 케이팝업> 방송" },
    { date: "2024-10-12", cat: "공항", dir: "출국", title: "스페인 출국" },
    { date: "2024-10-12", cat: "공연", sub: "뮤직뱅크 IN 마드리드", sub2: "스페인", title: "뮤직뱅크 IN 마드리드 공연" },
    { date: "2024-10-18", cat: "방송", sub: "바즈리듬02", sub2: "일본", title: "일본 TV아사히 《바즈리듬02 (バズリズム02)》 방송" },
    { date: "2024-10-19", cat: "팬사인회", sub: "중국 이즈위", title: "미니 3집 [19.99] 중국 이즈위 대면 팬사인회" },
    { date: "2024-10-25", cat: "팬사인회", sub: "블루드림미디어", title: "블루드림미디어 팬사인회" },
    { date: "2024-10-26", cat: "팬사인회", sub: "비트로드", title: "비트로드 팬사인회" },
    { date: "2024-10-27", cat: "팬사인회", sub: "알라딘", title: "알라딘 팬사인회" },
    { date: "2024-10-28", cat: "팬사인회", sub: "위버스", title: "위버스 팬사인회" },
    { date: "2024-10-29", cat: "팬사인회", sub: "온라인 토크", sub2: "일본", title: "일본 [19.99] 온라인 토크 이벤트" },
    { date: "2024-11-02", cat: "팬사인회", sub: "중국 이즈위", title: "중국 상하이 이즈위 대면 팬사인회" },
    { date: "2024-11-22", cat: "공연", sub: "MAMA", title: "MAMA" },
    { date: "2024-11-24", cat: "공항", dir: "입국", from: "KIX", to: "GMP" },
    { date: "2024-11-24", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿 팬싸인회" },
    { date: "2024-11-30", cat: "공연", sub: "MMA", title: "MMA (멜론 뮤직 어워드) 공연" },
    { date: "2024-12-03", cat: "공연", sub: "골든디스크", title: "골든디스크 어워즈 공연" },
    { date: "2024-12-14", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "한국(인천)", sub3: "DAY 1", title: "TOUR 'KNOCK ON Vol.1' IN INCHEON (Day 1)" },
    { date: "2024-12-15", cat: "공항", dir: "출국", from: "ICN", to: "HND" },
    { date: "2024-12-15", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "한국(인천)", sub3: "DAY 2", title: "TOUR 'KNOCK ON Vol.1' IN INCHEON (Day 2)" },
    { date: "2024-12-16", cat: "방송", sub: "CDTV", sub2: "일본", title: "CDTV 라이브! 라이브!" },
    { date: "2024-12-17", cat: "공항", dir: "입국", from: "HND", to: "ICN" },
    { date: "2024-12-20", cat: "공연", sub: "가요대축제", title: "가요대축제 공연" },
    { date: "2024-12-25", cat: "공연", sub: "가요대전", title: "가요대전 공연" },
    { date: "2024-12-27", cat: "공연", sub: "뮤직 스테이션 슈퍼 라이브", sub2: "일본", title: "뮤직 스테이션 슈퍼 라이브 공연" },
    { date: "2024-12-28", cat: "공연", sub: "年間ミュージックアワード", sub2: "일본", title: "니혼TV 《発表！今年イチバン聴いた歌〜年間ミュージックアワード 2024〜》 공연" },
    { date: "2024-12-29", cat: "공항", dir: "입국", from: "HND", to: "ICN" },
    { date: "2024-12-29", cat: "공연", sub: "가요대제전", title: "가요대제전 사전녹화" },
    { date: "2024-12-31", cat: "공연", sub: "가요대제전", title: "가요대제전 본방" },
    { date: "2025-01-07", cat: "라디오", sub: "두시탈출 컬투쇼", title: "'두시탈출 컬투쇼'" },
    { date: "2025-01-08", cat: "라디오", sub: "아이돌 라디오", title: "'아이돌 라디오'" },
    { date: "2025-01-09", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-01-10", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2025-01-10", cat: "라디오", sub: "키스 더 라디오", title: "'키스 더 라디오'" },
    { date: "2025-01-11", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2025-01-12", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2025-01-12", cat: "라디오", sub: "박소현의 러브게임", title: "'박소현의 러브게임' 라디오" },
    { date: "2025-01-16", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-01-17", cat: "방송", sub: "ENA 차트쇼 케이팝업", title: "'ENA 케이팝업 차트쇼' 방송" },
    { date: "2025-01-18", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2025-01-28", cat: "공항", dir: "출국", title: "일본 출국" },
    { date: "2025-01-29", cat: "공연", sub: "가요대제전", title: "가요대제전" },
    { date: "2025-01-30", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(도쿄)", title: "'KNOCK ON Vol.1' 도쿄 콘서트" },
    { date: "2025-01-31", cat: "방송", sub: "뮤직스테이션", sub2: "일본", title: "일본 TV아사히 '뮤직스테이션'" },
    { date: "2025-02-02", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(나고야)", title: "'KNOCK ON Vol.1' 아이치(나고야) 콘서트" },
    { date: "2025-02-08", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(오사카)", sub3: "DAY 1", title: "'KNOCK ON Vol.1' 오사카 콘서트 (Day 1)" },
    { date: "2025-02-09", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(오사카)", sub3: "DAY 2", title: "'KNOCK ON Vol.1' 오사카 콘서트 (Day 2)" },
    { date: "2025-02-15", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(센다이)", title: "'KNOCK ON Vol.1' 미야기(센다이) 콘서트" },
    { date: "2025-02-17", cat: "기타 일정", sub: "졸업", title: "운학 고등학교 졸업" },
    { date: "2025-02-18", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(후쿠오카)", sub3: "DAY 1", title: "'KNOCK ON Vol.1' 후쿠오카 콘서트 (Day 1)" },
    { date: "2025-02-19", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(후쿠오카)", sub3: "DAY 2", title: "'KNOCK ON Vol.1' 후쿠오카 콘서트 (Day 2)" },
    { date: "2025-02-22", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(요코하마)", sub3: "DAY 1", title: "'KNOCK ON Vol.1' 가나가와(요코하마) 콘서트 (Day 1)" },
    { date: "2025-02-23", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(요코하마)", sub3: "DAY 2", title: "'KNOCK ON Vol.1' 가나가와(요코하마) 콘서트 (Day 2)" },
    { date: "2025-02-24", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(요코하마)", sub3: "투어 파이널", title: "'KNOCK ON Vol.1' 가나가와 일본 투어 파이널 콘서트" },
    { date: "2025-03-12", cat: "공연", sub: "골드디스크 대상", sub2: "일본", title: "제39회 일본 골드디스크" },
    { date: "2025-03-13", cat: "공항", dir: "출국", from: "ICN" },
    { date: "2025-03-15", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "싱가포르", title: "'KNOCK ON Vol.1' 싱가포르 콘서트" },
    { date: "2025-03-20", cat: "공항", dir: "출국", from: "ICN" },
    { date: "2025-03-22", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "필리핀(마닐라)", title: "'KNOCK ON Vol.1' 마닐라 콘서트" },
    { date: "2025-04-03", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "대만(타이베이)", title: "'KNOCK ON Vol.1' 타이베이 콘서트" },
    { date: "2025-04-06", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "홍콩", title: "'KNOCK ON Vol.1' 홍콩 콘서트" },
    { date: "2025-04-12", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "인도네시아(자카르타)", title: "'KNOCK ON Vol.1' 자카르타 콘서트" },
    { date: "2025-05-04", cat: "기타 일정", sub: "시구/시타", title: "부산 사직야구장(NC vs 롯데) 시구 및 시타" },
    { date: "2025-05-10", cat: "공연", sub: "KCON", sub2: "일본", title: "일본 KCON" },
    { date: "2025-05-14", cat: "공연", sub: "컴백 쇼케이스", sub2: "[No Genre]", title: "[No Genre] 컴백 쇼케이스" },
    { date: "2025-05-15", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운 컴백" },
    { date: "2025-05-16", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2025-05-16", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "[No Genre]", title: "[No Genre] 멜론 리스닝 파티" },
    { date: "2025-05-16", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[No Genre]", title: "[No Genre] 구매자 대상 영상통화 팬사인회" },
    { date: "2025-05-16", cat: "방송", sub: "더 시즌즈", title: "'더 시즌즈-박보검의 칸타빌레' 방송" },
    { date: "2025-05-17", cat: "음방", sub: "음악중심", title: "음악중심 음방" },
    { date: "2025-05-17", cat: "공연", sub: "이세계페스티벌", title: "이세계 페스티벌 2025 공연" },
    { date: "2025-05-18", cat: "음방", sub: "인기가요", title: "인기가요 음방" },
    { date: "2025-05-20", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2025-05-22", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-05-23", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2025-05-24", cat: "음방", sub: "음악중심", title: "음악중심 음방" },
    { date: "2025-05-24", cat: "미니 팬미팅", sub: "음악중심", title: "미니 팬미팅" },
    { date: "2025-05-25", cat: "음방", sub: "인기가요", title: "인기가요 음방" },
    { date: "2025-05-25", cat: "라디오", sub: "박명수의 라디오쇼", title: "박명수의 라디오쇼" },
    { date: "2025-05-26", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 [No Genre] 영상통화 팬사인회 (1회차)" },
    { date: "2025-05-27", cat: "대학 축제", sub: "경희대 국제캠퍼스", title: "경희대학교 국제캠퍼스 축제 'Adelante'" },
    { date: "2025-05-28", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영상통화 팬사인회 (2회차)" },
    { date: "2025-05-29", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-05-31", cat: "공연", sub: "위버스콘", title: "위버스콘" },
    { date: "2025-06-01", cat: "팬사인회", sub: "뮤직코리아", title: "뮤직코리아 팬사인회" },
    { date: "2025-06-02", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2025-06-02", cat: "팬사인회", sub: "비트로드", title: "비트로드 팬싸" },
    { date: "2025-06-03", cat: "팬사인회", sub: "케이타운포유", title: "케이타운포유 팬사인회" },
    { date: "2025-06-09", cat: "팬사인회", sub: "팬플리", title: "팬플리 팬사인회" },
    { date: "2025-06-10", cat: "영상통화 팬사인회", sub: "멜론 뮤직웨이브", title: "멜론 뮤직웨이브 영통 팬사인회" },
    { date: "2025-06-11", cat: "팬사인회", sub: "케이앤팝스", title: "케이엔팝스 팬사인회" },
    { date: "2025-06-14", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤직플랜트 팬사인회" },
    { date: "2025-06-21", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영상통화 팬사인회 (3회차)" },
    { date: "2025-06-22", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영상통화 팬사인회 (4회차)" },
    { date: "2025-06-23", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영상통화 팬사인회 (5회차) 마지막" },
    { date: "2025-06-26", cat: "공항", dir: "출국", title: "일본 출국" },
    { date: "2025-06-26", cat: "팬사인회", sub: "온라인 토크", sub2: "일본", title: "[No Genre] 일본 온라인 토크" },
    { date: "2025-06-28", cat: "공항", title: "막하쿠 공항" },
    { date: "2025-06-28", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(앙코르)", sub3: "DAY 1", title: "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 1)" },
    { date: "2025-06-29", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(앙코르)", sub3: "DAY 2", title: "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 2)" },
    { date: "2025-06-30", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "일본(앙코르)", sub3: "DAY 3", title: "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 3)" },
    { date: "2025-07-01", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 [No Genre] 밋앤그릿" },
    { date: "2025-07-02", cat: "공연", sub: "FNS 가요제", sub2: "일본", title: "FNS 가요제 여름 공연" },
    { date: "2025-07-05", cat: "방송", sub: "THE MUSIC DAY", sub2: "일본", title: "THE MUSIC DAY 방송" },
    { date: "2025-07-05", cat: "공연", sub: "KCON", sub2: "일본", title: "KCON JAPAN 2025 드림 스테이지" },
    { date: "2025-07-05", cat: "팬사인회", sub: "KCON", sub2: "일본", title: "공팬", note: "KCON JAPAN 2025 드림 스테이지 공개팬싸" },
    { date: "2025-07-11", cat: "팬사인회", sub: "스페셜 대면", title: "서울 [No Genre] 스페셜 대면 팬사인회" },
    { date: "2025-07-12", cat: "팬사인회", sub: "중국 대면", sub2: "상하이", title: "중국 상하이 [No Genre] 대면 팬사인회 및 포토회" },
    { date: "2025-07-25", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "한국(서울) FINAL", sub3: "DAY 1", title: "BOYNEXTDOOR TOUR 'KNOCK ON Vol.1' FINAL (Day 1)" },
    { date: "2025-07-26", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "한국(서울) FINAL", sub3: "DAY 2", title: "'KNOCK ON Vol.1' FINAL (Day 2)" },
    { date: "2025-07-27", cat: "콘서트", sub: "KNOCK ON Vol.1", sub2: "한국(서울) FINAL", sub3: "DAY 3", title: "'KNOCK ON Vol.1' FINAL (Day 3)" },
    { date: "2025-07-31", cat: "공항", dir: "출국", title: "미국 시카고 출국" },
    { date: "2025-07-31", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-08-02", cat: "공연", sub: "Lollapalooza", sub2: "미국", title: "Lollapalooza After Shows 공연" },
    { date: "2025-08-03", cat: "공연", sub: "Lollapalooza", sub2: "미국", title: "Lollapalooza (시카고 Grant Park) 및 After Shows 공연" },
    { date: "2025-08-04", cat: "공연", sub: "Lollapalooza", sub2: "미국", title: "Lollapalooza Chicago 공연" },
    { date: "2025-08-05", cat: "라디오", sub: "배철수의 음악캠프", title: "'배철수의 음악캠프' 라디오" },
    { date: "2025-08-15", cat: "공연", sub: "Global Spin Live", sub2: "미국", title: "그래미 뮤지엄 'Global Spin Live'공연" },
    { date: "2025-08-18", cat: "방송", sub: "CDTV", sub2: "일본", title: "CDTV 라이브! 라이브! 방송" },
    { date: "2025-08-21", cat: "공연", sub: "컴백 쇼케이스", sub2: "[BOYLIFE]", title: "일본 [BOYLIFE] 컴백 쇼케이스" },
    { date: "2025-08-24", cat: "팬사인회", sub: "프리미엄 사인회", sub2: "일본", title: "일본 [BOYLIFE] 프리미엄 사인회" },
    { date: "2025-08-27", cat: "라디오", sub: "메자마시TV", sub2: "일본", title: "메자마시 TV 방송" },
    { date: "2025-08-28", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-08-30", cat: "팬사인회", sub: "중국 대면", sub2: "베이징", title: "중국 베이징 [No Genre] 대면 팬사인회 및 포토회" },
    { date: "2025-09-01", cat: "방송", sub: "CDTV", sub2: "일본", title: "CDTV 라이브! 라이브! 방송" },
    { date: "2025-09-05", cat: "기타 일정", sub: "팝업", sub2: "코치", title: "코치(Coach) 무신사 성수 팝업 행사" },
    { date: "2025-09-07", cat: "팬사인회", sub: "닥터지", title: "닥터지 대면 팬사인회" },
    { date: "2025-09-12", cat: "기타 일정", sub: "개막식", title: "2025 세계남자배구선수권대회 개막식" },
    { date: "2025-09-13", cat: "방송", sub: "with MUSIC", sub2: "일본", title: "with MUSIC" },
    { date: "2025-09-15", cat: "팬사인회", sub: "프리미엄 사인회", sub2: "일본", title: "일본 [BOYLIFE] 프리미엄 사인회" },
    { date: "2025-09-15", cat: "대학 축제", sub: "한양대 ERICA", title: "한양대학교 에리카 가을축제 공연" },
    { date: "2025-09-16", cat: "대학 축제", sub: "동국대", title: "2025 동국대 영캠프" },
    { date: "2025-09-16", cat: "대학 축제", sub: "한양대 ERICA", title: "한양대 ERICA 가을축제 공연" },
    { date: "2025-09-19", cat: "공항", dir: "출국", title: "출국" },
    { date: "2025-09-20", cat: "공연", sub: "TMA", title: "더팩트 뮤직 어워즈 (TMA)" },
    { date: "2025-09-25", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2025-09-26", cat: "대학 축제", sub: "숭실대", title: "숭실대학교 대동제 '위량제' 공연" },
    { date: "2025-09-27", cat: "대학 축제", sub: "고려대", title: "고려대학교 'Hi 입실렌티' 공연" },
    { date: "2025-10-17", cat: "공연", sub: "MAMA", title: "2025 MAMA AWARDS" },
    { date: "2025-10-20", cat: "공연", sub: "컴백 쇼케이스", sub2: "[THE ACTION]", title: "[THE ACTION] 컴백 쇼케이스" },
    { date: "2025-10-21", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2025-10-22", cat: "라디오", sub: "이은지의 가요광장", title: "이은지의 가요광장" },
    { date: "2025-10-24", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2025-10-25", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2025-10-25", cat: "공연", sub: "INK 콘서트", title: "제16회 INK 콘서트 공연" },
    { date: "2025-10-26", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2025-10-26", cat: "라디오", sub: "박소현의 러브게임", title: "박소현의 러브게임 라디오" },
    { date: "2025-10-27", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[THE ACTION]", title: "[The Action] 구매자 영통 팬사인회" },
    { date: "2025-10-28", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (1회차)" },
    { date: "2025-10-29", cat: "라디오", sub: "아이돌 라디오", title: "아이돌 라디오" },
    { date: "2025-10-29", cat: "음방", sub: "쇼챔피언", title: "쇼챔피언" },
    { date: "2025-10-30", cat: "라디오", sub: "웬디의 영스트리트", title: "웬디의 영스트리트 라디오" },
    { date: "2025-10-30", cat: "라디오", sub: "키스 더 라디오", title: "한해의 키스 더 라디오" },
    { date: "2025-10-31", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2025-10-31", cat: "팬사인회", sub: "블루드림미디어", title: "블루드림미디어 팬사인회" },
    { date: "2025-11-01", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2025-11-01", cat: "미니 팬미팅", sub: "음악중심", title: "음중미팬" },
    { date: "2025-11-02", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2025-11-02", cat: "라디오", sub: "아이돌 라디오", title: "아이돌 라디오" },
    { date: "2025-11-02", cat: "공연", sub: "COLOR IN MUSIC FESTIVAL", title: "COLOR IN MUSIC FESTIVAL 공연" },
    { date: "2025-11-04", cat: "팬사인회", sub: "뮤직아트", title: "뮤직아트 팬사인회" },
    { date: "2025-11-05", cat: "팬사인회", sub: "케이앤팝스", title: "케이앤팝스 팬사인회" },
    { date: "2025-11-06", cat: "팬사인회", sub: "비트로드", title: "비트로드 팬사인회" },
    { date: "2025-11-07", cat: "라디오", sub: "J-WAVE START LINE", sub2: "일본", title: "J-WAVE START LINE" },
    { date: "2025-11-07", cat: "팬사인회", sub: "엠투유", title: "엠투유 팬사인회" },
    { date: "2025-11-08", cat: "팬사인회", sub: "메이크스타", title: "메이크스타 팬사인회" },
    { date: "2025-11-10", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 오사카 밋앤그릿" },
    { date: "2025-11-11", cat: "팬사인회", sub: "세이치즈", title: "Blue ocean", note: "세이치즈 팬싸" },
    { date: "2025-11-12", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 도쿄 밋앤그릿" },
    { date: "2025-11-14", cat: "공연", sub: "KGMA", title: "KGMA 공연" },
    { date: "2025-11-16", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (2회차)" },
    { date: "2025-11-17", cat: "영상통화 팬사인회", sub: "뮤직플랜트", title: "뮤직플랜트 영통 팬사인회" },
    { date: "2025-11-18", cat: "라디오", sub: "STEP ONE", sub2: "일본", title: "STEP ONE" },
    { date: "2025-11-18", cat: "공연", sub: "music × serendipity", sub2: "일본", title: "music × serendipity" },
    { date: "2025-11-18", cat: "팬사인회", sub: "온라인 토크", sub2: "일본", title: "일본 온라인 토크" },
    { date: "2025-11-19", cat: "공연", sub: "청룡영화상", title: "제46회 청룡영화상 시상식 공연" },
    { date: "2025-11-23", cat: "팬사인회", sub: "조은뮤직", title: "조은뮤직 팬사인회" },
    { date: "2025-11-24", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (3회차)" },
    { date: "2025-11-25", cat: "팬사인회", sub: "팬플리", title: "팬플리 팬사인회" },
    { date: "2025-11-26", cat: "공항", dir: "출국", title: "출국" },
    { date: "2025-11-28", cat: "공연", sub: "MAMA", title: "2025 MAMA AWARDS" },
    { date: "2025-12-02", cat: "라디오", sub: "이은지의 가요광장", title: "이은지의 가요광장 스페셜 DJ" },
    { date: "2025-12-02", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (4회차)" },
    { date: "2025-12-03", cat: "라디오", sub: "이은지의 가요광장", title: "이은지의 가요광장 스페셜 DJ" },
    { date: "2025-12-03", cat: "영상통화 팬사인회", sub: "뮤브", title: "뮤브 영통 팬사인회" },
    { date: "2025-12-04", cat: "라디오", sub: "이은지의 가요광장", title: "이은지의 가요광장 스페셜 DJ" },
    { date: "2025-12-04", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (5회차)" },
    { date: "2025-12-07", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (6회차)" },
    { date: "2025-12-09", cat: "팬사인회", sub: "점프업이엔티", title: "The Action 팬사인회" },
    { date: "2025-12-10", cat: "팬사인회", sub: "위버스", title: "위버스 스페셜 팬사인회" },
    { date: "2025-12-11", cat: "팬사인회", sub: "스페셜 대면", title: "The Action 스페셜 대면 팬사인회" },
    { date: "2025-12-11", cat: "공연", sub: "MAMA", title: "MAMA/MMA 인사 영상" },
    { date: "2025-12-13", cat: "공연", sub: "뮤직뱅크 글로벌 페스티벌", sub2: "일본", title: "일본 뮤직뱅크 글로벌 페스티벌 공연" },
    { date: "2025-12-15", cat: "공항", dir: "입국", title: "입국" },
    { date: "2025-12-20", cat: "공연", sub: "MMA", title: "멜론 뮤직 어워드 (MMA 2025)" },
    { date: "2025-12-25", cat: "공연", sub: "가요대전", title: "2025 SBS 가요대전" },
    { date: "2025-12-26", cat: "공항", dir: "출국", title: "일본 출국" },
    { date: "2025-12-27", cat: "공연", sub: "COUNTDOWN JAPAN", sub2: "일본", title: "COUNTDOWN JAPAN" },
    { date: "2025-12-28", cat: "공항", dir: "입국", title: "입국" },
    { date: "2025-12-30", cat: "공연", sub: "일본 레코드 대상", sub2: "일본", title: "제67회 일본 레코드 대상" },
    { date: "2025-12-31", cat: "공연", sub: "가요대제전", title: "2025 MBC 가요대제전" },
    { date: "2025-12-31", cat: "방송", sub: "CDTV", sub2: "일본", title: "CDTV 라이브! 라이브! 방송" },
    { date: "2026-01-01", cat: "공연", sub: "가요대제전", title: "가요대제전 공연" },
    { date: "2026-01-02", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (7회차)" },
    { date: "2026-01-09", cat: "공항", dir: "출국", title: "타이베이 출국" },
    { date: "2026-01-10", cat: "공연", sub: "골든디스크", title: "제40회 골든디스크어워즈 공연" },
    { date: "2026-01-12", cat: "공연", sub: "with MUSIC LIVE", sub2: "일본", title: "일본 with MUSIC LIVE 공연" },
    { date: "2026-01-24", cat: "팬사인회", sub: "중국 대면", sub2: "베이징", title: "중국 베이징 대면 팬사인회" },
    { date: "2026-01-25", cat: "팬사인회", sub: "중국 대면", sub2: "베이징", title: "중국 베이징 대면 팬사인회 및 포토회" },
    { date: "2026-01-30", cat: "영상통화 팬사인회", sub: "중국 이즈위", title: "중국 이즈위 영통 팬사인회 (8회차)" },
    { date: "2026-02-04", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "['KNOCK ON Vol.1' FINAL LIVE]", title: "['KNOCK ON Vol.1' FINAL LIVE ] 멜론 리스닝 파티" },
    { date: "2026-02-06", cat: "공항", dir: "출국", title: "중국 광저우 출국" },
    { date: "2026-02-06", cat: "팬사인회", sub: "중국 대면", sub2: "광저우", title: "포토회·대면 팬사인회" },
    { date: "2026-02-07", cat: "팬사인회", sub: "중국 대면", sub2: "광저우", title: "광저우 대면 팬사인회 (2일차)" },
    { date: "2026-02-11", cat: "공연", sub: "디 어워즈", title: "제2회 디 어워즈 공연" },
    { date: "2026-02-14", cat: "공연", sub: "BEAT AX", sub2: "Vol.9", sub3: "DAY 1", title: "일본 'BEAT AX Vol.9' (DAY1) 공연" },
    { date: "2026-02-15", cat: "공연", sub: "BEAT AX", sub2: "Vol.9", sub3: "DAY 2", title: "일본 'BEAT AX Vol.9' (DAY2) 공연" },
    { date: "2026-02-16", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿" },
    { date: "2026-03-04", cat: "기타 일정", sub: "패션쇼", title: "Courrèges 2026 SS 쇼" },
    { date: "2026-03-06", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-03-07", cat: "공연", sub: "CDTV", sub2: "일본", title: "일본 CDTV 라이브!라이브! 공연" },
    { date: "2026-03-13", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-03-13", cat: "공연", sub: "7-ELEVEN 가오슝 벚꽃축제", sub2: "대만", title: "2026 7-ELEVEN 가오슝 벚꽃축제 공연" },
    { date: "2026-04-11", cat: "방송", sub: "토모다치 베이스", sub2: "일본", title: "일본 닛폰TV '토모다치 베이스'" },
    { date: "2026-04-30", cat: "공연", sub: "한국PD대상", title: "제38회 한국PD대상 공연" },
    { date: "2026-05-09", cat: "공연", sub: "Kstyle PARTY", sub2: "일본", title: "일본 KSTYLE PARTY 공연" },
    { date: "2026-05-11", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "'똑똑똑'", title: "정규 1집 선공개 곡 '똑똑똑' 멜론 리스닝 파티" },
    { date: "2026-05-12", cat: "공연", sub: "열린음악회", title: "열린음악회" },
    { date: "2026-05-12", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2026-05-13", cat: "대학 축제", sub: "강남대", title: "강남대학교 목양축전" },
    { date: "2026-05-13", cat: "대학 축제", sub: "가천대", title: "가천 Water Festival 공연" },
    { date: "2026-05-14", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2026-05-15", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2026-05-16", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2026-05-17", cat: "대학 축제", sub: "연세대", title: "연세대 축제 공연" },
    { date: "2026-05-17", cat: "음방", sub: "인기가요", title: "'인기가요'음방" },
    { date: "2026-05-21", cat: "대학 축제", sub: "고려대", title: "고려대 석탑대동제" },
    { date: "2026-05-28", cat: "대학 축제", sub: "인제대", title: "인제대학교" },
    { date: "2026-05-28", cat: "대학 축제", sub: "부산대", title: "부산대학교" },
    { date: "2026-05-31", cat: "공연", sub: "열린음악회", title: "열린음악회" },
    { date: "2026-06-06", cat: "공연", sub: "위버스콘", title: "Weverse Con Festival 공연" },
    { date: "2026-06-08", cat: "공연", sub: "컴백 쇼케이스", sub2: "[HOME]", title: "[HOME] 컴백 쇼케이스" },
    { date: "2026-06-11", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2026-06-12", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2026-06-13", cat: "음방", sub: "음악중심", title: "음악중심 음방" },
    { date: "2026-06-13", cat: "미니 팬미팅", sub: "음악중심", title: "음중 미니 팬미팅" },
    { date: "2026-06-14", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2026-06-15", cat: "공연", sub: "울산뮤직페스티벌", title: "울산뮤직페스티벌" },
    { date: "2026-06-16", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼 라디오" },
    { date: "2026-06-17", cat: "라디오", sub: "박명수의 라디오쇼", title: "박명수의 라디오쇼" },
    { date: "2026-06-17", cat: "라디오", sub: "유인라디오", title: "유인라디오" },
    { date: "2026-06-17", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[HOME]", title: "[HOME] 구매자 영상통화 팬사인회" },
    { date: "2026-06-18", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2026-06-19", cat: "음방", sub: "뮤직뱅크", title: "뮤직뱅크" },
    { date: "2026-06-19", cat: "방송", sub: "더 시즌즈", title: "더 시즌즈 성시경의 고막남친 방송" },
    { date: "2026-06-20", cat: "공연", sub: "서울가요대상", title: "제35회 서울가요대상 공연" },
    { date: "2026-06-21", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2026-06-21", cat: "팬사인회", sub: "엠투유", title: "엠투유 팬사인회" },
    { date: "2026-06-22", cat: "팬사인회", sub: "뮤직플랜트", title: "뮤직 플랜트 팬사인회" },
    { date: "2026-06-24", cat: "기타 일정", sub: "시구/시타", title: "삼성 라이온즈 vs LG 트윈스 시구/시타" },
    { date: "2026-06-25", cat: "음방", sub: "엠카운트다운", title: "엠카운트다운" },
    { date: "2026-06-26", cat: "팬사인회", sub: "조은뮤직", title: "조은뮤직 팬사인회" },
    { date: "2026-06-27", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2026-06-27", cat: "팬사인회", sub: "블루드림미디어", title: "블루드림미디어 팬사인회" },
    { date: "2026-06-28", cat: "음방", sub: "인기가요", title: "인기가요" },
    { date: "2026-06-28", cat: "방송", sub: "매점가요2", title: "매점가요2 라이브" },
    { date: "2026-06-28", cat: "팬사인회", sub: "알라딘", title: "알라딘 팬사인회" },
    { date: "2026-07-03", cat: "팬사인회", sub: "사운드웨이브", title: "사운드웨이브 팬사인회" },
    { date: "2026-07-04", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (1회차)" },
    { date: "2026-07-05", cat: "팬사인회", sub: "뮤직아트", title: "뮤직아트 팬사인회" },
    { date: "2026-07-07", cat: "팬사인회", sub: "메이크스타", title: "메이크스타 팬사인회" },
    { date: "2026-07-08", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (2회차)" },
    { date: "2026-07-09", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (3회차)" },
    { date: "2026-07-10", cat: "팬사인회", sub: "케이앤팝스", title: "케이앤팝스 팬사인회" },
    { date: "2026-07-11", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (4회차)" },
    { date: "2026-07-12", cat: "영상통화 팬사인회", sub: "헬로라이브", title: "헬로라이브 영통팬싸" },
    { date: "2026-07-17", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(서울)", sub3: "DAY 1", title: "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 1)" },
    { date: "2026-07-18", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(서울)", sub3: "DAY 2", title: "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 2)" },
    { date: "2026-07-19", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(서울)", sub3: "DAY 3", title: "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 3)" },
    { date: "2026-07-20", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (5회차)" },
    { date: "2026-07-24", cat: "팬사인회", sub: "비트로드", title: "비트로드 팬사인회" },
    { date: "2026-07-25", cat: "팬사인회", sub: "중국 KMS", sub2: "상하이", title: "KMS 상하이 대면 팬사인회 (1일차)" },
    { date: "2026-07-26", cat: "팬사인회", sub: "중국 KMS", sub2: "상하이", title: "KMS 상하이 대면 팬사인회 (2일차)" },
    { date: "2026-07-27", cat: "팬사인회", sub: "YES24", title: "예스24 팬사인회" },
    { date: "2026-07-29", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "중국 KMS 영상통화 팬사인회 (6회차)" },
    { date: "2026-07-30", cat: "영상통화 팬사인회", sub: "일본", title: "일본 영통 팬싸" },
    { date: "2026-07-31", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(부산)", sub3: "DAY 1", title: "부산 콘서트 (DAY 1)" },
    { date: "2026-08-01", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(부산)", sub3: "DAY 2", title: "BUSAN KNOCK ON Vol.2 (DAY 2)" },
    { date: "2026-08-02", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "한국(부산)", sub3: "DAY 3", title: "BUSAN KNOCK ON Vol.2 (DAY 3)" },
    { date: "2026-08-05", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영상통화 팬사인회 (7회차)" },
    { date: "2026-08-06", cat: "팬사인회", sub: "팬플리", title: "팬플리 팬사인회" },
    { date: "2026-08-08", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-08-08", cat: "팬사인회", sub: "중국 KMS", sub2: "칭다오", title: "KMS 칭다오 대면 팬사인회" },
    { date: "2026-08-09", cat: "팬사인회", sub: "중국 KMS", sub2: "칭다오", title: "KMS 칭다오 대면 팬사인회" },
    { date: "2026-08-16", cat: "팬사인회", sub: "위버스", title: "위버스 스페셜 대면 팬사인회" },
    { date: "2026-08-17", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-08-17", cat: "방송", sub: "CDTV", sub2: "일본", title: "CDTV 라이브! 라이브! 방송" },
    { date: "2026-08-18", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿 및 하이터치회" },
    { date: "2026-08-19", cat: "팬사인회", sub: "타워레코드", sub2: "일본", title: "일본 시부야 타워 레코드 팬사인회" },
    { date: "2026-08-21", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(가나가와)", sub3: "DAY 1", title: "KANAGAWA KNOCK ON Vol.2 (DAY 1)" },
    { date: "2026-08-22", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(가나가와)", sub3: "DAY 2", title: "KANAGAWA KNOCK ON Vol.2 (DAY 2)" },
    { date: "2026-08-23", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(가나가와)", sub3: "DAY 3", title: "KANAGAWA KNOCK ON Vol.2 (DAY 3)" },
    { date: "2026-08-28", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-08-29", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(사가)", sub3: "DAY 1", title: "SAGA KNOCK ON Vol.2 (DAY 1)" },
    { date: "2026-08-30", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(사가)", sub3: "DAY 2", title: "SAGA KNOCK ON Vol.2 (DAY 2)" },
    { date: "2026-08-31", cat: "공항", dir: "입국", title: "입국" },
    { date: "2026-08-31", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "중국 KMS 영상통화 팬사인회 (8회차)" },
    { date: "2026-09-01", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "Boom Boom Boom", title: "Boom Boom Boom 리스닝파티" },
    { date: "2026-09-01", cat: "영상통화 팬사인회", sub: "중국 KMS", title: "KMS 영통" },
    { date: "2026-09-05", cat: "음방", sub: "음악중심", title: "음악중심" },
    { date: "2026-09-08", cat: "팬사인회", sub: "밋앤그릿", sub2: "일본", title: "일본 밋앤그릿 및 하이터치회" },
    { date: "2026-09-09", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(오사카)", sub3: "DAY 1", title: "KNOCK ON Vol.2 IN OSAKA (DAY 1)" },
    { date: "2026-09-10", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(오사카)", sub3: "DAY 2", title: "KNOCK ON Vol.2 IN OSAKA (DAY 2)" },
    { date: "2026-09-11", cat: "방송", sub: "바즈리듬02", sub2: "일본", title: "버즈리듬02 방송" },
    { date: "2026-09-12", cat: "음방", sub: "Venue101", sub2: "일본", title: "일본 Venue101 음방" },
    { date: "2026-09-13", cat: "공항", dir: "입국", title: "입국" },
    { date: "2026-09-19", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(미야기)", sub3: "DAY 1", title: "KNOCK ON Vol.2 IN MIYAGI (DAY 1)" },
    { date: "2026-09-20", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(미야기)", sub3: "DAY 2", title: "KNOCK ON Vol.2 IN MIYAGI (DAY 2)" },
    { date: "2026-09-24", cat: "공항", dir: "출국", title: "출국" },
    { date: "2026-09-25", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(나가노)", sub3: "DAY 1", title: "KNOCK ON Vol.2 IN NAGANO (DAY 1)" },
    { date: "2026-09-26", cat: "콘서트", sub: "KNOCK ON Vol.2", sub2: "일본(나가노)", sub3: "DAY 2", title: "KNOCK ON Vol.2 IN NAGANO (DAY 2)" },
    { date: "2026-09-28", cat: "기타 일정", sub: "멜론 뮤직웨이브", sub2: "[HOME: DELUXE]", title: "[HOME: DELUXE] 멜론 리스닝파티" },
    { date: "2026-09-28", cat: "영상통화 팬사인회", sub: "구매자 대상 영상통화 팬사인회", sub2: "[HOME: DELUXE]", title: "[HOME: DELUXE] 구매자 대상 영통 팬사인회" },
    { date: "2026-09-29", cat: "라디오", sub: "두시탈출 컬투쇼", title: "두시탈출 컬투쇼" },
    { date: "2026-09-29", cat: "팬사인회", sub: "유플러스", title: "유플러스 대면 팬사인회" }
    ],

    items: [
      // 2023-05-30
      ...slots("2023-05-30", "[WHO!] 컴백 쇼케이스"),
      // 2023-06-01
      ...slots("2023-06-01", "엠카"),
      // 2023-06-02
      ...slots("2023-06-02", "뮤직뱅크"),
      ...slots("2023-06-02", "뮤뱅 미니팬미팅"),
      // 2023-06-04
      ...slots("2023-06-04", "[WHO!] 구매자 대상 영상통화 팬사인회"),
      // 2023-06-08
      ...slots("2023-06-08", "엠카"),
      // 2023-06-09
      ...slots("2023-06-09", "뮤직코리아 팬싸"),
      // 2023-06-10
      ...slots("2023-06-10", "위버스콘"),
      // 2023-06-11
      ...slots("2023-06-11", "알라딘 팬싸"),
      // 2023-06-13
      ...slots("2023-06-13", "두시탈출 컬투쇼"),
      ...slots("2023-06-13", "뮤플 팬싸"),
      // 2023-06-14
      ...slots("2023-06-14", "일본 영통팬싸"),
      // 2023-06-15
      ...slots("2023-06-15", "엠투유 팬싸"),
      // 2023-06-16
      ...slots("2023-06-16", "뮤플 팬싸"),
      ...slots("2023-06-16", "키스 더 라디오"),
      // 2023-06-17
      ...slots("2023-06-17", "에스24 팬싸"),
      // 2023-06-18
      ...slots("2023-06-18", "[WHO!] 구매자 대상 대면팬싸"),
      // 2023-06-19
      ...slots("2023-06-19", "EBS 경청 라디오"),
      // 2023-06-22
      ...slots("2023-06-22", "엠카"),
      // 2023-06-23
      ...slots("2023-06-23", "케타포유 영통팬싸"),
      // 2023-06-24
      ...slots("2023-06-24", "STATION Z 라디오"),
      // 2023-06-25
      ...slots("2023-06-25", "인가"),
      ...slots("2023-06-25", "인가미팬"),
      ...slots("2023-06-25", "디마뮤 영통"),
      // 2023-06-30
      ...slots("2023-06-30", "뮤직뱅크"),
      // 2023-07-08
      ...slots("2023-07-08", "키스 더 라디오"),
      // 2023-07-15
      ...slots("2023-07-15", "키스 더 라디오"),
      // 2023-07-16
      ...slots("2023-07-16", "GMP ➔ HND"),
      // 2023-07-17
      ...slots("2023-07-17", "일본 도쿄 J-WAVE INSPIRE TOKYO 공연"),
      // 2023-07-18
      ...slots("2023-07-18", "HND ➔ GMP"),
      ...slots("2023-07-18", "일본 메자마시TV 라디오"),
      ...slots("2023-07-18", "일본 메자마시TV 공연"),
      ...slots("2023-07-18", "THE TIME 라디오"),
      ...slots("2023-07-18", "STEP ONE 라디오"),
      // 2023-07-22
      ...slots("2023-07-22", "키스 더 라디오"),
      // 2023-07-23
      ...slots("2023-07-23", "인가"),
      // 2023-07-24
      ...slots("2023-07-24", "인가"),
      // 2023-07-29
      ...slots("2023-07-29", "키스 더 라디오"),
      // 2023-08-05
      ...slots("2023-08-05", "키스 더 라디오"),
      // 2023-08-10
      ...slots("2023-08-10", "K Global Heart Dream Awards"),
      // 2023-08-12
      ...slots("2023-08-12", "키스 더 라디오"),
      // 2023-08-15
      ...slots("2023-08-15", "키스 더 라디오"),
      // 2023-08-17
      ...slots("2023-08-17", "엠카"),
      // 2023-08-19
      ...slots("2023-08-19", "키스 더 라디오"),
      // 2023-08-20
      ...slots("2023-08-20", "EBS 경청 라디오"),
      // 2023-08-26
      ...slots("2023-08-26", "키스 더 라디오"),
      // 2023-09-04
      ...slots("2023-09-04", "[WHY] 컴백 쇼케이스"),
      ...slots("2023-09-04", "CGV BOYNEXTDOOR 2NIGHT 방송"),
      // 2023-09-07
      ...slots("2023-09-07", "영재의 친한친구 라디오"),
      // 2023-09-08
      ...slots("2023-09-08", "뮤뱅"),
      ...slots("2023-09-08", "뮤뱅미팬"),
      ...slots("2023-09-08", "키스 더 라디오"),
      // 2023-09-10
      ...slots("2023-09-10", "[WHY] 구매자 대상 영통 팬싸"),
      // 2023-09-11
      ...slots("2023-09-11", "아이돌 라디오"),
      ...slots("2023-09-11", "홍대"),
      // 2023-09-12
      ...slots("2023-09-12", "더쇼"),
      // 2023-09-13
      ...slots("2023-09-13", "쇼챔 음방"),
      ...slots("2023-09-13", "키스 더 라디오"),
      // 2023-09-14
      ...slots("2023-09-14", "경희대 서울캠퍼스"),
      // 2023-09-15
      ...slots("2023-09-15", "뮤뱅출근퇴근"),
      ...slots("2023-09-15", "STATION Z 라디오"),
      ...slots("2023-09-15", "에스24 팬싸"),
      // 2023-09-16
      ...slots("2023-09-16", "디어마이뮤즈 영상통화 팬사인회"),
      ...slots("2023-09-16", "키스 더 라디오"),
      // 2023-09-17
      ...slots("2023-09-17", "알라딘 팬싸"),
      // 2023-09-18
      ...slots("2023-09-18", "블루드림미디어 팬싸"),
      // 2023-09-19
      ...slots("2023-09-19", "더쇼"),
      ...slots("2023-09-19", "After School Club 방송"),
      // 2023-09-20
      ...slots("2023-09-20", "키엘 팝업 스토어"),
      ...slots("2023-09-20", "경희대 국제캠퍼스"),
      // 2023-09-21
      ...slots("2023-09-21", "한국외대"),
      // 2023-09-22
      ...slots("2023-09-22", "뮤직뱅크"),
      ...slots("2023-09-22", "뮤직코리아 팬싸"),
      // 2023-09-23
      ...slots("2023-09-23", "키스 더 라디오"),
      // 2023-09-24
      ...slots("2023-09-24", "케이타운포유 팬싸"),
      // 2023-09-26
      ...slots("2023-09-26", "스폰지뮤직 영상통화 팬싸인회"),
      // 2023-09-27
      ...slots("2023-09-27", "쇼챔"),
      // 2023-09-29
      ...slots("2023-09-29", "GMP ➔ HND"),
      // 2023-09-30
      ...slots("2023-09-30", "GirlsAward"),
      // 2023-10-01
      ...slots("2023-10-01", "일본 [WHY..] 하이터치회"),
      // 2023-10-07
      ...slots("2023-10-07", "일본 Venue101 (베뉴 원오원) 음방"),
      ...slots("2023-10-07", "Coke STUDIO SUPERPOP 공연"),
      // 2023-10-08
      ...slots("2023-10-08", "공항?"),
      ...slots("2023-10-08", "영동대로 K-POP 콘서트"),
      // 2023-10-10
      ...slots("2023-10-10", "더팩트 뮤직 어워즈 (TMA)"),
      // 2023-10-13
      ...slots("2023-10-13", "엠투유 팬싸"),
      // 2023-10-14
      ...slots("2023-10-14", "[WHY..] 온라인 토크 (일본)"),
      // 2023-10-15
      ...slots("2023-10-15", "공항"),
      ...slots("2023-10-15", "사운드웨이브 팬싸"),
      // 2023-10-16
      ...slots("2023-10-16", "디어마이뮤즈 영통팬싸"),
      // 2023-10-20
      ...slots("2023-10-20", "키스 더 라디오"),
      // 2023-10-21
      ...slots("2023-10-21", "키스 더 라디오"),
      // 2023-10-22
      ...slots("2023-10-22", "인가"),
      // 2023-10-23
      ...slots("2023-10-23", "디어마이뮤즈 영통팬싸"),
      // 2023-10-28
      ...slots("2023-10-28", "키스 더 라디오"),
      // 2023-11-06
      ...slots("2023-11-06", "ICN ➔ LHR"),
      // 2023-11-08
      ...slots("2023-11-08", "Korea On Stage In London"),
      // 2023-11-09
      ...slots("2023-11-09", "Korea On Stage In London"),
      // 2023-11-11
      ...slots("2023-11-11", "LHR ➔ ICN"),
      // 2023-11-12
      ...slots("2023-11-12", "LHR ➔ ICN"),
      // 2023-11-16
      ...slots("2023-11-16", "엠카"),
      // 2023-11-17
      ...slots("2023-11-17", "ICN ➔ BKK"),
      // 2023-11-18
      ...slots("2023-11-18", "Supersound Festival bkk(방콕콘서트)"),
      // 2023-11-19
      ...slots("2023-11-19", "BKK ➔ ICN"),
      // 2023-11-23
      ...slots("2023-11-23", "코리아 온 스테이지 인 런던"),
      // 2023-11-24
      ...slots("2023-11-24", "출국 GMP"),
      ...slots("2023-11-24", "뮤뱅"),
      // 2023-11-25
      ...slots("2023-11-25", "Neighbors Con 공연"),
      // 2023-11-28
      ...slots("2023-11-28", "MAMA AWARDS 개인 공연"),
      // 2023-11-29
      ...slots("2023-11-29", "MAMA RED CARPET"),
      // 2023-11-30
      ...slots("2023-11-30", "공항"),
      // 2023-12-02
      ...slots("2023-12-02", "MMA 멜론 뮤직 어워드"),
      // 2023-12-03
      ...slots("2023-12-03", "인가"),
      // 2023-12-04
      ...slots("2023-12-04", "제 38회 골든디스크어워즈"),
      // 2023-12-09
      ...slots("2023-12-09", "일본 뮤직뱅크 글로벌 페스티벌"),
      // 2023-12-10
      ...slots("2023-12-10", "공항"),
      // 2023-12-13
      ...slots("2023-12-13", "공항"),
      // 2023-12-14
      ...slots("2023-12-14", "AAA ( 아시아 아티스트 어워즈 )"),
      // 2023-12-15
      ...slots("2023-12-15", "<Galaxy S23 FE> LAUNCHING PARTY"),
      // 2023-12-16
      ...slots("2023-12-16", "ICN ➔ TAO"),
      ...slots("2023-12-16", "이즈위 대면 팬사인회"),
      // 2023-12-18
      ...slots("2023-12-18", "애버랜드"),
      // 2023-12-23
      ...slots("2023-12-23", "가요대전"),
      // 2023-12-25
      ...slots("2023-12-25", "가요대전"),
      // 2023-12-29
      ...slots("2023-12-29", "가요대제전"),
      // 2023-12-31
      ...slots("2023-12-31", "가요대제전"),
      // 2024-01-01
      ...slots("2024-01-01", "가요대제전"),
      // 2024-01-02
      ...slots("2024-01-02", "K-Pop Masterz×KROSS vol.3 공연"),
      // 2024-01-05
      ...slots("2024-01-05", "엠카운트다운 음방"),
      // 2024-01-06
      ...slots("2024-01-06", "골든디스크 GDA"),
      // 2024-01-11
      ...slots("2024-01-11", "엠카운트다운 음방"),
      // 2024-01-16
      ...slots("2024-01-16", "BEAT AX Vol.2' (DAY1) 공연"),
      // 2024-01-17
      ...slots("2024-01-17", "BEAT AX Vol.2' (DAY2) 공연"),
      // 2024-02-04
      ...slots("2024-02-04", "원도어 멤버십 런칭 기념 팬사인회"),
      // 2024-02-10
      ...slots("2024-02-10", "일본 닛폰TV <&TEAM학園 2学期> 방송"),
      // 2024-02-24
      ...slots("2024-02-24", "일본 KSTYLE PARTY 공연"),
      // 2024-02-28
      ...slots("2024-02-28", "KCON HONG KONG"),
      // 2024-02-29
      ...slots("2024-02-29", "출국 ICN"),
      // 2024-03-02
      ...slots("2024-03-02", "일본 제38회 마이나비 도쿄 걸즈 컬렉션 2024 S/S 공연"),
      // 2024-03-14
      ...slots("2024-03-14", "원도어 멤버십 오픈 기념 팬사인회"),
      // 2024-03-15
      ...slots("2024-03-15", "대만 출국"),
      // 2024-03-16
      ...slots("2024-03-16", "Mezamashi TV 30th Anniversary Festival 공연"),
      // 2024-03-21
      ...slots("2024-03-21", "일본 후지TV"),
      // 2024-03-28
      ...slots("2024-03-28", "일본 후지TV"),
      // 2024-03-29
      ...slots("2024-03-29", "홍콩 출국"),
      // 2024-03-30
      ...slots("2024-03-30", "<KCON HONG KONG> 공연"),
      ...slots("2024-03-30", "밋앤그릿(MEET & GREET) 팬싸"),
      // 2024-03-31
      ...slots("2024-03-31", "<KCON HONG KONG> 공연"),
      // 2024-04-13
      ...slots("2024-04-13", "GOLDEN WAVE in TAIWAN 공연"),
      // 2024-04-15
      ...slots("2024-04-15", "[HOW?] 컴백 쇼케이스 (BOYNEXTDOOR TONI3HT)"),
      // 2024-04-16
      ...slots("2024-04-16", "두시탈출 컬투쇼"),
      ...slots("2024-04-16", "[HOW?] 멜론 리스닝파티"),
      // 2024-04-17
      ...slots("2024-04-17", "키스 더 라디오"),
      // 2024-04-18
      ...slots("2024-04-18", "엠카운트다운 컴백"),
      // 2024-04-19
      ...slots("2024-04-19", "쇼피 영통 팬싸"),
      ...slots("2024-04-19", "더 현대 팝업"),
      // 2024-04-20
      ...slots("2024-04-20", "음악중심"),
      ...slots("2024-04-20", "[HOW?] 구매자 대상 영상통화 팬사인회"),
      // 2024-04-21
      ...slots("2024-04-21", "인기가요"),
      ...slots("2024-04-21", "<박소현의 러브게임>"),
      // 2024-04-22
      ...slots("2024-04-22", "대만 가오슝 내셔널 스타디움 공연"),
      // 2024-04-23
      ...slots("2024-04-23", "SBS M <더 쇼> 음방"),
      // 2024-04-24
      ...slots("2024-04-24", "<쇼챔피언> 음방"),
      ...slots("2024-04-24", "<아이돌 라디오>"),
      // 2024-04-25
      ...slots("2024-04-25", "엠카운트다운"),
      // 2024-04-26
      ...slots("2024-04-26", "<뮤직뱅크> 음방"),
      ...slots("2024-04-26", "뮤뱅출근"),
      ...slots("2024-04-26", "Y24 팬사인회"),
      // 2024-04-27
      ...slots("2024-04-27", "<음악중심> 음방"),
      ...slots("2024-04-27", "엠투유 팬사인회, M2U 팬싸"),
      // 2024-04-28
      ...slots("2024-04-28", "인기가요음방"),
      ...slots("2024-04-28", "뮤직플랜트 팬사인회"),
      // 2024-04-29
      ...slots("2024-04-29", "뮤직코리아 팬사인회"),
      // 2024-04-30
      ...slots("2024-04-30", "일본 영통 팬싸인회"),
      // 2024-05-05
      ...slots("2024-05-05", "인가"),
      ...slots("2024-05-05", "팬플리 영상통화 팬사인회"),
      // 2024-05-06
      ...slots("2024-05-06", "일본 밋앤그릿"),
      // 2024-05-07
      ...slots("2024-05-07", "더쇼"),
      ...slots("2024-05-07", "열린음악회"),
      // 2024-05-09
      ...slots("2024-05-09", "GMP"),
      // 2024-05-10
      ...slots("2024-05-10", "KCON 공연"),
      ...slots("2024-05-10", "M&G"),
      // 2024-05-13
      ...slots("2024-05-13", "SANDSOUND 팝업"),
      // 2024-05-17
      ...slots("2024-05-17", "ICN ➔ PEK"),
      ...slots("2024-05-17", "이즈위 대면"),
      // 2024-05-18
      ...slots("2024-05-18", "입국 PEK"),
      ...slots("2024-05-18", "이즈위 대면"),
      // 2024-05-22
      ...slots("2024-05-22", "위드뮤"),
      // 2024-05-24
      ...slots("2024-05-24", "GMP"),
      // 2024-05-25
      ...slots("2024-05-25", "SW부산팬사"),
      // 2024-06-01
      ...slots("2024-06-01", "WONDERfulDAY (DAY1)"),
      // 2024-06-02
      ...slots("2024-06-02", "WONDERfulDAY (DAY2)"),
      // 2024-06-04
      ...slots("2024-06-04", "위버스 팬사인회 WVS 팬싸"),
      // 2024-06-07
      ...slots("2024-06-07", "공항"),
      ...slots("2024-06-07", "뮤직아트 팬싸"),
      // 2024-06-08
      ...slots("2024-06-08", "부산원아시아페스티벌(BOF) 원아페 공연"),
      // 2024-06-15
      ...slots("2024-06-15", "위버스콘 공연"),
      // 2024-06-18
      ...slots("2024-06-18", "GMP ➔ HND"),
      // 2024-06-19
      ...slots("2024-06-19", "공연"),
      // 2024-06-25
      ...slots("2024-06-25", "HND ➔ GMP"),
      // 2024-06-26
      ...slots("2024-06-26", "[HOW?] 위버스 영상통화 팬사인회 (2회차)"),
      // 2024-06-28
      ...slots("2024-06-28", "ICN ➔ NRT"),
      // 2024-06-29
      ...slots("2024-06-29", "입국 ICN"),
      ...slots("2024-06-29", "BEAT AX Vol.4 공연"),
      // 2024-07-07
      ...slots("2024-07-07", "일본 TBS 《CDTV 라이브! 라이브!》"),
      // 2024-07-08
      ...slots("2024-07-08", "일본 TBS 《CDTV 라이브! 라이브!》"),
      // 2024-07-09
      ...slots("2024-07-09", "GMP ➔ HND"),
      // 2024-07-10
      ...slots("2024-07-10", "일본 DayDay"),
      ...slots("2024-07-10", "[AND,] 컴백 쇼케이스"),
      // 2024-07-11
      ...slots("2024-07-11", "HND ➔ GMP"),
      // 2024-07-13
      ...slots("2024-07-13", "일본 TBS 《음악의 날 2024》 방송"),
      ...slots("2024-07-13", "J-WAVE INSPIRE TOKYO 공연"),
      // 2024-07-15
      ...slots("2024-07-15", "J-WAVE SPECIAL INSPIRE TO THE NEXT"),
      // 2024-07-19
      ...slots("2024-07-19", "중국 마카오 5th TMEA 공연"),
      // 2024-07-21
      ...slots("2024-07-21", "HND ➔ GMP"),
      ...slots("2024-07-21", "일본 The MusiQuest 공연"),
      // 2024-07-26
      ...slots("2024-07-26", "미국 LA KCON 공연"),
      // 2024-07-27
      ...slots("2024-07-27", "미국 LA KCON 공연"),
      ...slots("2024-07-27", "미국 LA KCON MEET & GREET"),
      // 2024-08-03
      ...slots("2024-08-03", "일본 AND, 밋앤그릿 팬싸인회"),
      // 2024-08-04
      ...slots("2024-08-04", "일본 AND, 밋앤그릿 팬싸인회"),
      // 2024-08-05
      ...slots("2024-08-05", "아육대 사전녹화"),
      // 2024-08-09
      ...slots("2024-08-09", "중국 칭다오 팬사인회"),
      // 2024-08-10
      ...slots("2024-08-10", "중국 칭다오 팬사인회"),
      // 2024-08-12
      ...slots("2024-08-12", "울산 서머 페스티벌 공연"),
      // 2024-08-16
      ...slots("2024-08-16", "2024 파리 올림픽 기념 국민대축제 <파리의 영웅들>공연"),
      // 2024-08-18
      ...slots("2024-08-18", "일본 SUMMER SONIC TOKYO 공연"),
      // 2024-08-20
      ...slots("2024-08-20", "일본 도쿄 오다이바 모험왕 - 메자마시 라이브 공연"),
      // 2024-08-22
      ...slots("2024-08-22", "엠카운트다운"),
      // 2024-08-23
      ...slots("2024-08-23", "ICN ➔ BKK"),
      // 2024-08-24
      ...slots("2024-08-24", "태국 방콕 SUMMER SONIC BANGKOK 공연"),
      // 2024-08-29
      ...slots("2024-08-29", "엠카운트다운"),
      // 2024-09-05
      ...slots("2024-09-05", "엠카운트다운"),
      // 2024-09-06
      ...slots("2024-09-06", "뮤직뱅크 출퇴근"),
      // 2024-09-07
      ...slots("2024-09-07", "음악중심"),
      ...slots("2024-09-07", "음중 미니 팬미팅"),
      // 2024-09-08
      ...slots("2024-09-08", "CGV 연남 <마이 아티 필름>"),
      ...slots("2024-09-08", "인기가요"),
      // 2024-09-09
      ...slots("2024-09-09", "[19.99] 컴백 쇼케이스"),
      // 2024-09-10
      ...slots("2024-09-10", "[19.99] 멜론 리스닝 파티"),
      ...slots("2024-09-10", "두시탈출 컬투쇼"),
      ...slots("2024-09-10", "열린음악회 공연"),
      // 2024-09-11
      ...slots("2024-09-11", "한양여자대학교 공연"),
      // 2024-09-12
      ...slots("2024-09-12", "엠카운트다운"),
      // 2024-09-13
      ...slots("2024-09-13", "뮤직뱅크"),
      ...slots("2024-09-13", "뮤직아트 팬사인회"),
      // 2024-09-14
      ...slots("2024-09-14", "음악중심"),
      ...slots("2024-09-14", "음중 미팬"),
      ...slots("2024-09-14", "[19.99] 구매자 영상통화 팬사인회"),
      // 2024-09-18
      ...slots("2024-09-18", "아이돌라디오 라디오"),
      // 2024-09-20
      ...slots("2024-09-20", "뮤직뱅크"),
      ...slots("2024-09-20", "[19.99] YES24 팬사인회"),
      // 2024-09-21
      ...slots("2024-09-21", "음악중심"),
      // 2024-09-22
      ...slots("2024-09-22", "인기가요 사녹"),
      ...slots("2024-09-22", "PEPSI FESTA 공연"),
      // 2024-09-23
      ...slots("2024-09-23", "뮤직플랜트 팬사인회"),
      // 2024-09-25
      ...slots("2024-09-25", "조은뮤직 팬사인회"),
      // 2024-09-26
      ...slots("2024-09-26", "엠카운트다운"),
      // 2024-09-27
      ...slots("2024-09-27", "애플뮤직 팬사인회"),
      // 2024-09-28
      ...slots("2024-09-28", "위드뮤 팬사인회"),
      // 2024-09-29
      ...slots("2024-09-29", "<열린음악회> 공연"),
      // 2024-10-01
      ...slots("2024-10-01", "일본 밋앤그릿"),
      // 2024-10-05
      ...slots("2024-10-05", "케이타운포유 팬사인회"),
      // 2024-10-09
      ...slots("2024-10-09", "케이팝머치 팬사인회"),
      // 2024-10-11
      ...slots("2024-10-11", "<ENA 차트쇼 케이팝업> 방송"),
      // 2024-10-12
      ...slots("2024-10-12", "스페인 출국"),
      ...slots("2024-10-12", "뮤직뱅크 IN 마드리드 공연"),
      // 2024-10-18
      ...slots("2024-10-18", "일본 TV아사히 《바즈리듬02 (バズリズム02)》 방송"),
      // 2024-10-19
      ...slots("2024-10-19", "미니 3집 [19.99] 중국 이즈위 대면 팬사인회"),
      // 2024-10-25
      ...slots("2024-10-25", "블루드림미디어 팬사인회"),
      // 2024-10-26
      ...slots("2024-10-26", "비트로드 팬사인회"),
      // 2024-10-27
      ...slots("2024-10-27", "알라딘 팬사인회"),
      // 2024-10-28
      ...slots("2024-10-28", "위버스 팬사인회"),
      // 2024-10-29
      ...slots("2024-10-29", "일본 [19.99] 온라인 토크 이벤트"),
      // 2024-11-02
      ...slots("2024-11-02", "중국 상하이 이즈위 대면 팬사인회"),
      // 2024-11-22
      ...slots("2024-11-22", "MAMA"),
      // 2024-11-24
      ...slots("2024-11-24", "KIX ➔ GMP"),
      ...slots("2024-11-24", "일본 밋앤그릿 팬싸인회"),
      // 2024-11-30
      ...slots("2024-11-30", "MMA (멜론 뮤직 어워드) 공연"),
      // 2024-12-03
      ...slots("2024-12-03", "골든디스크 어워즈 공연"),
      // 2024-12-14
      ...slots("2024-12-14", "TOUR 'KNOCK ON Vol.1' IN INCHEON (Day 1)"),
      // 2024-12-15
      ...slots("2024-12-15", "ICN ➔ HND"),
      ...slots("2024-12-15", "TOUR 'KNOCK ON Vol.1' IN INCHEON (Day 2)"),
      // 2024-12-16
      ...slots("2024-12-16", "CDTV 라이브! 라이브!"),
      // 2024-12-17
      ...slots("2024-12-17", "HND ➔ ICN"),
      // 2024-12-20
      ...slots("2024-12-20", "가요대축제 공연"),
      // 2024-12-25
      ...slots("2024-12-25", "가요대전 공연"),
      // 2024-12-27
      ...slots("2024-12-27", "뮤직 스테이션 슈퍼 라이브 공연"),
      // 2024-12-28
      ...slots("2024-12-28", "니혼TV 《発表！今年イチバン聴いた歌〜年間ミュージックアワード 2024〜》 공연"),
      // 2024-12-29
      ...slots("2024-12-29", "HND ➔ ICN"),
      ...slots("2024-12-29", "가요대제전 사전녹화"),
      // 2024-12-31
      ...slots("2024-12-31", "가요대제전 본방"),
      // 2025-01-07
      ...slots("2025-01-07", "'두시탈출 컬투쇼'"),
      // 2025-01-08
      ...slots("2025-01-08", "'아이돌 라디오'"),
      // 2025-01-09
      ...slots("2025-01-09", "엠카운트다운"),
      // 2025-01-10
      ...slots("2025-01-10", "뮤직뱅크"),
      ...slots("2025-01-10", "'키스 더 라디오'"),
      // 2025-01-11
      ...slots("2025-01-11", "음악중심"),
      // 2025-01-12
      ...slots("2025-01-12", "인기가요"),
      ...slots("2025-01-12", "'박소현의 러브게임' 라디오"),
      // 2025-01-16
      ...slots("2025-01-16", "엠카운트다운"),
      // 2025-01-17
      ...slots("2025-01-17", "'ENA 케이팝업 차트쇼' 방송"),
      // 2025-01-18
      ...slots("2025-01-18", "음악중심"),
      // 2025-01-28
      ...slots("2025-01-28", "일본 출국"),
      // 2025-01-29
      ...slots("2025-01-29", "가요대제전"),
      // 2025-01-30
      ...slots("2025-01-30", "'KNOCK ON Vol.1' 도쿄 콘서트"),
      // 2025-01-31
      ...slots("2025-01-31", "일본 TV아사히 '뮤직스테이션'"),
      // 2025-02-02
      ...slots("2025-02-02", "'KNOCK ON Vol.1' 아이치(나고야) 콘서트"),
      // 2025-02-08
      ...slots("2025-02-08", "'KNOCK ON Vol.1' 오사카 콘서트 (Day 1)"),
      // 2025-02-09
      ...slots("2025-02-09", "'KNOCK ON Vol.1' 오사카 콘서트 (Day 2)"),
      // 2025-02-15
      ...slots("2025-02-15", "'KNOCK ON Vol.1' 미야기(센다이) 콘서트"),
      // 2025-02-17
      ...slots("2025-02-17", "운학 고등학교 졸업"),
      // 2025-02-18
      ...slots("2025-02-18", "'KNOCK ON Vol.1' 후쿠오카 콘서트 (Day 1)"),
      // 2025-02-19
      ...slots("2025-02-19", "'KNOCK ON Vol.1' 후쿠오카 콘서트 (Day 2)"),
      // 2025-02-22
      ...slots("2025-02-22", "'KNOCK ON Vol.1' 가나가와(요코하마) 콘서트 (Day 1)"),
      // 2025-02-23
      ...slots("2025-02-23", "'KNOCK ON Vol.1' 가나가와(요코하마) 콘서트 (Day 2)"),
      // 2025-02-24
      ...slots("2025-02-24", "'KNOCK ON Vol.1' 가나가와 일본 투어 파이널 콘서트"),
      // 2025-03-12
      ...slots("2025-03-12", "제39회 일본 골드디스크"),
      // 2025-03-13
      ...slots("2025-03-13", "출국 ICN"),
      // 2025-03-15
      ...slots("2025-03-15", "'KNOCK ON Vol.1' 싱가포르 콘서트"),
      // 2025-03-20
      ...slots("2025-03-20", "출국 ICN"),
      // 2025-03-22
      ...slots("2025-03-22", "'KNOCK ON Vol.1' 마닐라 콘서트"),
      // 2025-04-03
      ...slots("2025-04-03", "'KNOCK ON Vol.1' 타이베이 콘서트"),
      // 2025-04-06
      ...slots("2025-04-06", "'KNOCK ON Vol.1' 홍콩 콘서트"),
      // 2025-04-12
      ...slots("2025-04-12", "'KNOCK ON Vol.1' 자카르타 콘서트"),
      // 2025-05-04
      ...slots("2025-05-04", "부산 사직야구장(NC vs 롯데) 시구 및 시타"),
      // 2025-05-10
      ...slots("2025-05-10", "일본 KCON"),
      // 2025-05-14
      ...slots("2025-05-14", "[No Genre] 컴백 쇼케이스"),
      // 2025-05-15
      ...slots("2025-05-15", "엠카운트다운 컴백"),
      // 2025-05-16
      ...slots("2025-05-16", "뮤직뱅크"),
      ...slots("2025-05-16", "[No Genre] 멜론 리스닝 파티"),
      ...slots("2025-05-16", "[No Genre] 구매자 대상 영상통화 팬사인회"),
      ...slots("2025-05-16", "'더 시즌즈-박보검의 칸타빌레' 방송"),
      // 2025-05-17
      ...slots("2025-05-17", "음악중심 음방"),
      ...slots("2025-05-17", "이세계 페스티벌 2025 공연"),
      // 2025-05-18
      ...slots("2025-05-18", "인기가요 음방"),
      // 2025-05-20
      ...slots("2025-05-20", "두시탈출 컬투쇼"),
      // 2025-05-22
      ...slots("2025-05-22", "엠카운트다운"),
      // 2025-05-23
      ...slots("2025-05-23", "뮤직뱅크"),
      // 2025-05-24
      ...slots("2025-05-24", "음악중심 음방"),
      ...slots("2025-05-24", "미니 팬미팅"),
      // 2025-05-25
      ...slots("2025-05-25", "인기가요 음방"),
      ...slots("2025-05-25", "박명수의 라디오쇼"),
      // 2025-05-26
      ...slots("2025-05-26", "중국 이즈위 [No Genre] 영상통화 팬사인회 (1회차)"),
      // 2025-05-27
      ...slots("2025-05-27", "경희대학교 국제캠퍼스 축제 'Adelante'"),
      // 2025-05-28
      ...slots("2025-05-28", "중국 이즈위 영상통화 팬사인회 (2회차)"),
      // 2025-05-29
      ...slots("2025-05-29", "엠카운트다운"),
      // 2025-05-31
      ...slots("2025-05-31", "위버스콘"),
      // 2025-06-01
      ...slots("2025-06-01", "뮤직코리아 팬사인회"),
      // 2025-06-02
      ...slots("2025-06-02", "두시탈출 컬투쇼"),
      ...slots("2025-06-02", "비트로드 팬싸"),
      // 2025-06-03
      ...slots("2025-06-03", "케이타운포유 팬사인회"),
      // 2025-06-09
      ...slots("2025-06-09", "팬플리 팬사인회"),
      // 2025-06-10
      ...slots("2025-06-10", "멜론 뮤직웨이브 영통 팬사인회"),
      // 2025-06-11
      ...slots("2025-06-11", "케이엔팝스 팬사인회"),
      // 2025-06-14
      ...slots("2025-06-14", "뮤직플랜트 팬사인회"),
      // 2025-06-21
      ...slots("2025-06-21", "중국 이즈위 영상통화 팬사인회 (3회차)"),
      // 2025-06-22
      ...slots("2025-06-22", "중국 이즈위 영상통화 팬사인회 (4회차)"),
      // 2025-06-23
      ...slots("2025-06-23", "중국 이즈위 영상통화 팬사인회 (5회차) 마지막"),
      // 2025-06-26
      ...slots("2025-06-26", "일본 출국"),
      ...slots("2025-06-26", "[No Genre] 일본 온라인 토크"),
      // 2025-06-28
      ...slots("2025-06-28", "막하쿠 공항"),
      ...slots("2025-06-28", "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 1)"),
      // 2025-06-29
      ...slots("2025-06-29", "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 2)"),
      // 2025-06-30
      ...slots("2025-06-30", "TOUR 'KNOCK ON Vol.1' ENCORE IN JAPAN (Day 3)"),
      // 2025-07-01
      ...slots("2025-07-01", "일본 [No Genre] 밋앤그릿"),
      // 2025-07-02
      ...slots("2025-07-02", "FNS 가요제 여름 공연"),
      // 2025-07-05
      ...slots("2025-07-05", "THE MUSIC DAY 방송"),
      ...slots("2025-07-05", "KCON JAPAN 2025 드림 스테이지"),
      ...slots("2025-07-05", "공팬"),
      // 2025-07-11
      ...slots("2025-07-11", "서울 [No Genre] 스페셜 대면 팬사인회"),
      // 2025-07-12
      ...slots("2025-07-12", "중국 상하이 [No Genre] 대면 팬사인회 및 포토회"),
      // 2025-07-25
      ...slots("2025-07-25", "BOYNEXTDOOR TOUR 'KNOCK ON Vol.1' FINAL (Day 1)"),
      // 2025-07-26
      ...slots("2025-07-26", "'KNOCK ON Vol.1' FINAL (Day 2)"),
      // 2025-07-27
      ...slots("2025-07-27", "'KNOCK ON Vol.1' FINAL (Day 3)"),
      // 2025-07-31
      ...slots("2025-07-31", "미국 시카고 출국"),
      ...slots("2025-07-31", "엠카운트다운"),
      // 2025-08-02
      ...slots("2025-08-02", "Lollapalooza After Shows 공연"),
      // 2025-08-03
      ...slots("2025-08-03", "Lollapalooza (시카고 Grant Park) 및 After Shows 공연"),
      // 2025-08-04
      ...slots("2025-08-04", "Lollapalooza Chicago 공연"),
      // 2025-08-05
      ...slots("2025-08-05", "'배철수의 음악캠프' 라디오"),
      // 2025-08-15
      ...slots("2025-08-15", "그래미 뮤지엄 'Global Spin Live'공연"),
      // 2025-08-18
      ...slots("2025-08-18", "CDTV 라이브! 라이브! 방송"),
      // 2025-08-21
      ...slots("2025-08-21", "일본 [BOYLIFE] 컴백 쇼케이스"),
      // 2025-08-24
      ...slots("2025-08-24", "일본 [BOYLIFE] 프리미엄 사인회"),
      // 2025-08-27
      ...slots("2025-08-27", "메자마시 TV 방송"),
      // 2025-08-28
      ...slots("2025-08-28", "엠카운트다운"),
      // 2025-08-30
      ...slots("2025-08-30", "중국 베이징 [No Genre] 대면 팬사인회 및 포토회"),
      // 2025-09-01
      ...slots("2025-09-01", "CDTV 라이브! 라이브! 방송"),
      // 2025-09-05
      ...slots("2025-09-05", "코치(Coach) 무신사 성수 팝업 행사"),
      // 2025-09-07
      ...slots("2025-09-07", "닥터지 대면 팬사인회"),
      // 2025-09-12
      ...slots("2025-09-12", "2025 세계남자배구선수권대회 개막식"),
      // 2025-09-13
      ...slots("2025-09-13", "with MUSIC"),
      // 2025-09-15
      ...slots("2025-09-15", "일본 [BOYLIFE] 프리미엄 사인회"),
      ...slots("2025-09-15", "한양대학교 에리카 가을축제 공연"),
      // 2025-09-16
      ...slots("2025-09-16", "2025 동국대 영캠프"),
      ...slots("2025-09-16", "한양대 ERICA 가을축제 공연"),
      // 2025-09-19
      ...slots("2025-09-19", "출국"),
      // 2025-09-20
      ...slots("2025-09-20", "더팩트 뮤직 어워즈 (TMA)"),
      // 2025-09-25
      ...slots("2025-09-25", "엠카운트다운"),
      // 2025-09-26
      ...slots("2025-09-26", "숭실대학교 대동제 '위량제' 공연"),
      // 2025-09-27
      ...slots("2025-09-27", "고려대학교 'Hi 입실렌티' 공연"),
      // 2025-10-17
      ...slots("2025-10-17", "2025 MAMA AWARDS"),
      // 2025-10-20
      ...slots("2025-10-20", "[THE ACTION] 컴백 쇼케이스"),
      // 2025-10-21
      ...slots("2025-10-21", "두시탈출 컬투쇼"),
      // 2025-10-22
      ...slots("2025-10-22", "이은지의 가요광장"),
      // 2025-10-24
      ...slots("2025-10-24", "뮤직뱅크"),
      // 2025-10-25
      ...slots("2025-10-25", "음악중심"),
      ...slots("2025-10-25", "제16회 INK 콘서트 공연"),
      // 2025-10-26
      ...slots("2025-10-26", "인기가요"),
      ...slots("2025-10-26", "박소현의 러브게임 라디오"),
      // 2025-10-27
      ...slots("2025-10-27", "[The Action] 구매자 영통 팬사인회"),
      // 2025-10-28
      ...slots("2025-10-28", "중국 이즈위 영통 팬사인회 (1회차)"),
      // 2025-10-29
      ...slots("2025-10-29", "아이돌 라디오"),
      ...slots("2025-10-29", "쇼챔피언"),
      // 2025-10-30
      ...slots("2025-10-30", "웬디의 영스트리트 라디오"),
      ...slots("2025-10-30", "한해의 키스 더 라디오"),
      // 2025-10-31
      ...slots("2025-10-31", "뮤직뱅크"),
      ...slots("2025-10-31", "블루드림미디어 팬사인회"),
      // 2025-11-01
      ...slots("2025-11-01", "음악중심"),
      ...slots("2025-11-01", "음중미팬"),
      // 2025-11-02
      ...slots("2025-11-02", "인기가요"),
      ...slots("2025-11-02", "아이돌 라디오"),
      ...slots("2025-11-02", "COLOR IN MUSIC FESTIVAL 공연"),
      // 2025-11-04
      ...slots("2025-11-04", "뮤직아트 팬사인회"),
      // 2025-11-05
      ...slots("2025-11-05", "케이앤팝스 팬사인회"),
      // 2025-11-06
      ...slots("2025-11-06", "비트로드 팬사인회"),
      // 2025-11-07
      ...slots("2025-11-07", "J-WAVE START LINE"),
      ...slots("2025-11-07", "엠투유 팬사인회"),
      // 2025-11-08
      ...slots("2025-11-08", "메이크스타 팬사인회"),
      // 2025-11-10
      ...slots("2025-11-10", "일본 오사카 밋앤그릿"),
      // 2025-11-11
      ...slots("2025-11-11", "Blue ocean"),
      // 2025-11-12
      ...slots("2025-11-12", "일본 도쿄 밋앤그릿"),
      // 2025-11-14
      ...slots("2025-11-14", "KGMA 공연"),
      // 2025-11-16
      ...slots("2025-11-16", "중국 이즈위 영통 팬사인회 (2회차)"),
      // 2025-11-17
      ...slots("2025-11-17", "뮤직플랜트 영통 팬사인회"),
      // 2025-11-18
      ...slots("2025-11-18", "STEP ONE"),
      ...slots("2025-11-18", "music × serendipity"),
      ...slots("2025-11-18", "일본 온라인 토크"),
      // 2025-11-19
      ...slots("2025-11-19", "제46회 청룡영화상 시상식 공연"),
      // 2025-11-23
      ...slots("2025-11-23", "조은뮤직 팬사인회"),
      // 2025-11-24
      ...slots("2025-11-24", "중국 이즈위 영통 팬사인회 (3회차)"),
      // 2025-11-25
      ...slots("2025-11-25", "팬플리 팬사인회"),
      // 2025-11-26
      ...slots("2025-11-26", "출국"),
      // 2025-11-28
      ...slots("2025-11-28", "2025 MAMA AWARDS"),
      // 2025-12-02
      ...slots("2025-12-02", "이은지의 가요광장 스페셜 DJ"),
      ...slots("2025-12-02", "중국 이즈위 영통 팬사인회 (4회차)"),
      // 2025-12-03
      ...slots("2025-12-03", "이은지의 가요광장 스페셜 DJ"),
      ...slots("2025-12-03", "뮤브 영통 팬사인회"),
      // 2025-12-04
      ...slots("2025-12-04", "이은지의 가요광장 스페셜 DJ"),
      ...slots("2025-12-04", "중국 이즈위 영통 팬사인회 (5회차)"),
      // 2025-12-07
      ...slots("2025-12-07", "중국 이즈위 영통 팬사인회 (6회차)"),
      // 2025-12-09
      ...slots("2025-12-09", "The Action 팬사인회"),
      // 2025-12-10
      ...slots("2025-12-10", "위버스 스페셜 팬사인회"),
      // 2025-12-11
      ...slots("2025-12-11", "The Action 스페셜 대면 팬사인회"),
      ...slots("2025-12-11", "MAMA/MMA 인사 영상"),
      // 2025-12-13
      ...slots("2025-12-13", "일본 뮤직뱅크 글로벌 페스티벌 공연"),
      // 2025-12-15
      ...slots("2025-12-15", "입국"),
      // 2025-12-20
      ...slots("2025-12-20", "멜론 뮤직 어워드 (MMA 2025)"),
      // 2025-12-25
      ...slots("2025-12-25", "2025 SBS 가요대전"),
      // 2025-12-26
      ...slots("2025-12-26", "일본 출국"),
      // 2025-12-27
      ...slots("2025-12-27", "COUNTDOWN JAPAN"),
      // 2025-12-28
      ...slots("2025-12-28", "입국"),
      // 2025-12-30
      ...slots("2025-12-30", "제67회 일본 레코드 대상"),
      // 2025-12-31
      ...slots("2025-12-31", "2025 MBC 가요대제전"),
      ...slots("2025-12-31", "CDTV 라이브! 라이브! 방송"),
      // 2026-01-01
      ...slots("2026-01-01", "가요대제전 공연"),
      // 2026-01-02
      ...slots("2026-01-02", "중국 이즈위 영통 팬사인회 (7회차)"),
      // 2026-01-09
      ...slots("2026-01-09", "타이베이 출국"),
      // 2026-01-10
      ...slots("2026-01-10", "제40회 골든디스크어워즈 공연"),
      // 2026-01-12
      ...slots("2026-01-12", "일본 with MUSIC LIVE 공연"),
      // 2026-01-24
      ...slots("2026-01-24", "중국 베이징 대면 팬사인회"),
      // 2026-01-25
      ...slots("2026-01-25", "중국 베이징 대면 팬사인회 및 포토회"),
      // 2026-01-30
      ...slots("2026-01-30", "중국 이즈위 영통 팬사인회 (8회차)"),
      // 2026-02-04
      ...slots("2026-02-04", "['KNOCK ON Vol.1' FINAL LIVE ] 멜론 리스닝 파티"),
      // 2026-02-06
      ...slots("2026-02-06", "중국 광저우 출국"),
      ...slots("2026-02-06", "포토회·대면 팬사인회"),
      // 2026-02-07
      ...slots("2026-02-07", "광저우 대면 팬사인회 (2일차)"),
      // 2026-02-11
      ...slots("2026-02-11", "제2회 디 어워즈 공연"),
      // 2026-02-14
      ...slots("2026-02-14", "일본 'BEAT AX Vol.9' (DAY1) 공연"),
      // 2026-02-15
      ...slots("2026-02-15", "일본 'BEAT AX Vol.9' (DAY2) 공연"),
      // 2026-02-16
      ...slots("2026-02-16", "일본 밋앤그릿"),
      // 2026-03-04
      ...slots("2026-03-04", "Courrèges 2026 SS 쇼"),
      // 2026-03-06
      ...slots("2026-03-06", "출국"),
      // 2026-03-07
      ...slots("2026-03-07", "일본 CDTV 라이브!라이브! 공연"),
      // 2026-03-13
      ...slots("2026-03-13", "출국"),
      ...slots("2026-03-13", "2026 7-ELEVEN 가오슝 벚꽃축제 공연"),
      // 2026-04-11
      ...slots("2026-04-11", "일본 닛폰TV '토모다치 베이스'"),
      // 2026-04-30
      ...slots("2026-04-30", "제38회 한국PD대상 공연"),
      // 2026-05-09
      ...slots("2026-05-09", "일본 KSTYLE PARTY 공연"),
      // 2026-05-11
      ...slots("2026-05-11", "정규 1집 선공개 곡 '똑똑똑' 멜론 리스닝 파티"),
      // 2026-05-12
      ...slots("2026-05-12", "열린음악회"),
      ...slots("2026-05-12", "두시탈출 컬투쇼"),
      // 2026-05-13
      ...slots("2026-05-13", "강남대학교 목양축전"),
      ...slots("2026-05-13", "가천 Water Festival 공연"),
      // 2026-05-14
      ...slots("2026-05-14", "엠카운트다운"),
      // 2026-05-15
      ...slots("2026-05-15", "뮤직뱅크"),
      // 2026-05-16
      ...slots("2026-05-16", "음악중심"),
      // 2026-05-17
      ...slots("2026-05-17", "연세대 축제 공연"),
      ...slots("2026-05-17", "'인기가요'음방"),
      // 2026-05-21
      ...slots("2026-05-21", "고려대 석탑대동제"),
      // 2026-05-28
      ...slots("2026-05-28", "인제대학교"),
      ...slots("2026-05-28", "부산대학교"),
      // 2026-05-31
      ...slots("2026-05-31", "열린음악회"),
      // 2026-06-06
      ...slots("2026-06-06", "Weverse Con Festival 공연"),
      // 2026-06-08
      ...slots("2026-06-08", "[HOME] 컴백 쇼케이스"),
      // 2026-06-11
      ...slots("2026-06-11", "엠카운트다운"),
      // 2026-06-12
      ...slots("2026-06-12", "뮤직뱅크"),
      // 2026-06-13
      ...slots("2026-06-13", "음악중심 음방"),
      ...slots("2026-06-13", "음중 미니 팬미팅"),
      // 2026-06-14
      ...slots("2026-06-14", "인기가요"),
      // 2026-06-15
      ...slots("2026-06-15", "울산뮤직페스티벌"),
      // 2026-06-16
      ...slots("2026-06-16", "두시탈출 컬투쇼 라디오"),
      // 2026-06-17
      ...slots("2026-06-17", "박명수의 라디오쇼"),
      ...slots("2026-06-17", "유인라디오"),
      ...slots("2026-06-17", "[HOME] 구매자 영상통화 팬사인회"),
      // 2026-06-18
      ...slots("2026-06-18", "엠카운트다운"),
      // 2026-06-19
      ...slots("2026-06-19", "뮤직뱅크"),
      ...slots("2026-06-19", "더 시즌즈 성시경의 고막남친 방송"),
      // 2026-06-20
      ...slots("2026-06-20", "제35회 서울가요대상 공연"),
      // 2026-06-21
      ...slots("2026-06-21", "인기가요"),
      ...slots("2026-06-21", "엠투유 팬사인회"),
      // 2026-06-22
      ...slots("2026-06-22", "뮤직 플랜트 팬사인회"),
      // 2026-06-24
      ...slots("2026-06-24", "삼성 라이온즈 vs LG 트윈스 시구/시타"),
      // 2026-06-25
      ...slots("2026-06-25", "엠카운트다운"),
      // 2026-06-26
      ...slots("2026-06-26", "조은뮤직 팬사인회"),
      // 2026-06-27
      ...slots("2026-06-27", "음악중심"),
      ...slots("2026-06-27", "블루드림미디어 팬사인회"),
      // 2026-06-28
      ...slots("2026-06-28", "인기가요"),
      ...slots("2026-06-28", "매점가요2 라이브"),
      ...slots("2026-06-28", "알라딘 팬사인회"),
      // 2026-07-03
      ...slots("2026-07-03", "사운드웨이브 팬사인회"),
      // 2026-07-04
      ...slots("2026-07-04", "KMS 영상통화 팬사인회 (1회차)"),
      // 2026-07-05
      ...slots("2026-07-05", "뮤직아트 팬사인회"),
      // 2026-07-07
      ...slots("2026-07-07", "메이크스타 팬사인회"),
      // 2026-07-08
      ...slots("2026-07-08", "KMS 영상통화 팬사인회 (2회차)"),
      // 2026-07-09
      ...slots("2026-07-09", "KMS 영상통화 팬사인회 (3회차)"),
      // 2026-07-10
      ...slots("2026-07-10", "케이앤팝스 팬사인회"),
      // 2026-07-11
      ...slots("2026-07-11", "KMS 영상통화 팬사인회 (4회차)"),
      // 2026-07-12
      ...slots("2026-07-12", "헬로라이브 영통팬싸"),
      // 2026-07-17
      ...slots("2026-07-17", "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 1)"),
      // 2026-07-18
      ...slots("2026-07-18", "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 2)"),
      // 2026-07-19
      ...slots("2026-07-19", "TOUR 'KNOCK ON Vol.2' IN SEOUL (DAY 3)"),
      // 2026-07-20
      ...slots("2026-07-20", "KMS 영상통화 팬사인회 (5회차)"),
      // 2026-07-24
      ...slots("2026-07-24", "비트로드 팬사인회"),
      // 2026-07-25
      ...slots("2026-07-25", "KMS 상하이 대면 팬사인회 (1일차)"),
      // 2026-07-26
      ...slots("2026-07-26", "KMS 상하이 대면 팬사인회 (2일차)"),
      // 2026-07-27
      ...slots("2026-07-27", "예스24 팬사인회"),
      // 2026-07-29
      ...slots("2026-07-29", "중국 KMS 영상통화 팬사인회 (6회차)"),
      // 2026-07-30
      ...slots("2026-07-30", "일본 영통 팬싸"),
      // 2026-07-31
      ...slots("2026-07-31", "부산 콘서트 (DAY 1)"),
      // 2026-08-01
      ...slots("2026-08-01", "BUSAN KNOCK ON Vol.2 (DAY 2)"),
      // 2026-08-02
      ...slots("2026-08-02", "BUSAN KNOCK ON Vol.2 (DAY 3)"),
      // 2026-08-05
      ...slots("2026-08-05", "KMS 영상통화 팬사인회 (7회차)"),
      // 2026-08-06
      ...slots("2026-08-06", "팬플리 팬사인회"),
      // 2026-08-08
      ...slots("2026-08-08", "출국"),
      ...slots("2026-08-08", "KMS 칭다오 대면 팬사인회"),
      // 2026-08-09
      ...slots("2026-08-09", "KMS 칭다오 대면 팬사인회"),
      // 2026-08-16
      ...slots("2026-08-16", "위버스 스페셜 대면 팬사인회"),
      // 2026-08-17
      ...slots("2026-08-17", "출국"),
      ...slots("2026-08-17", "CDTV 라이브! 라이브! 방송"),
      // 2026-08-18
      ...slots("2026-08-18", "일본 밋앤그릿 및 하이터치회"),
      // 2026-08-19
      ...slots("2026-08-19", "일본 시부야 타워 레코드 팬사인회"),
      // 2026-08-21
      ...slots("2026-08-21", "KANAGAWA KNOCK ON Vol.2 (DAY 1)"),
      // 2026-08-22
      ...slots("2026-08-22", "KANAGAWA KNOCK ON Vol.2 (DAY 2)"),
      // 2026-08-23
      ...slots("2026-08-23", "KANAGAWA KNOCK ON Vol.2 (DAY 3)"),
      // 2026-08-28
      ...slots("2026-08-28", "출국"),
      // 2026-08-29
      ...slots("2026-08-29", "SAGA KNOCK ON Vol.2 (DAY 1)"),
      // 2026-08-30
      ...slots("2026-08-30", "SAGA KNOCK ON Vol.2 (DAY 2)"),
      // 2026-08-31
      ...slots("2026-08-31", "입국"),
      ...slots("2026-08-31", "중국 KMS 영상통화 팬사인회 (8회차)"),
      // 2026-09-01
      ...slots("2026-09-01", "Boom Boom Boom 리스닝파티"),
      ...slots("2026-09-01", "KMS 영통"),
      // 2026-09-05
      ...slots("2026-09-05", "음악중심"),
      // 2026-09-08
      ...slots("2026-09-08", "일본 밋앤그릿 및 하이터치회"),
      // 2026-09-09
      ...slots("2026-09-09", "KNOCK ON Vol.2 IN OSAKA (DAY 1)"),
      // 2026-09-10
      ...slots("2026-09-10", "KNOCK ON Vol.2 IN OSAKA (DAY 2)"),
      // 2026-09-11
      ...slots("2026-09-11", "버즈리듬02 방송"),
      // 2026-09-12
      ...slots("2026-09-12", "일본 Venue101 음방"),
      // 2026-09-13
      ...slots("2026-09-13", "입국"),
      // 2026-09-19
      ...slots("2026-09-19", "KNOCK ON Vol.2 IN MIYAGI (DAY 1)"),
      // 2026-09-20
      ...slots("2026-09-20", "KNOCK ON Vol.2 IN MIYAGI (DAY 2)"),
      // 2026-09-24
      ...slots("2026-09-24", "출국"),
      // 2026-09-25
      ...slots("2026-09-25", "KNOCK ON Vol.2 IN NAGANO (DAY 1)"),
      // 2026-09-26
      ...slots("2026-09-26", "KNOCK ON Vol.2 IN NAGANO (DAY 2)"),
      // 2026-09-28
      ...slots("2026-09-28", "[HOME: DELUXE] 멜론 리스닝파티"),
      ...slots("2026-09-28", "[HOME: DELUXE] 구매자 대상 영통 팬사인회"),
      // 2026-09-29
      ...slots("2026-09-29", "두시탈출 컬투쇼"),
      ...slots("2026-09-29", "유플러스 대면 팬사인회"),
      // ▼ 직접 채운 사진·영상 항목은 이 아래에 적으세요
    ]
  };
})();
