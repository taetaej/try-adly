# Adly — 프로젝트 핸드오프 문서

> CJ 메조미디어의 Ad-Tech 솔루션 허브 "Adly"의 랜딩 페이지 프로젝트입니다.

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 프레임워크 | React 19 + TypeScript |
| 빌드 | Vite 8 |
| 스타일링 | Tailwind CSS 4 (Vite 플러그인) |
| UI 컴포넌트 | shadcn/ui (base-nova 스타일) |
| 차트 | Recharts |
| 아이콘 | Lucide React |
| 배경 효과 | OGL (WebGL 기반 Threads 셰이더) |
| 폰트 | Pretendard Variable (CSS 선언), Geist (패키지 설치됨) |

---

## 프로젝트 구조

```
src/
├── main.tsx                  # 엔트리 — ThemeProvider > AuthProvider > App
├── App.tsx                   # 페이지 레이아웃 및 섹션 조합
├── index.css                 # 글로벌 스타일, 테마 변수(oklch), 애니메이션
├── lib/
│   └── utils.ts              # cn() 유틸 (clsx + tailwind-merge)
└── components/
    ├── ThemeProvider.tsx      # 다크/라이트 테마 Context (localStorage 연동)
    ├── AuthProvider.tsx       # 로그인 상태 Context (데모용 토글)
    ├── Navbar.tsx             # 상단 네비게이션 (테마 토글, 로그인/프로필)
    ├── Hero.tsx               # 히어로 섹션 (타이틀 + CTA)
    ├── ClientLogos.tsx        # 클라이언트 로고 무한 티커
    ├── AppLauncher.tsx        # 솔루션 런처 (로그인 시에만 표시)
    ├── Charts.tsx             # Market Insight 섹션 (스코어카드 + 차트 3종)
    ├── SolutionGate.tsx       # 솔루션 4단계 소개 + 모달
    ├── Ecosystem.tsx          # 빈 컴포넌트 (미구현, 향후 확장용)
    ├── ContactBanner.tsx      # CTA 배너
    ├── Changelog.tsx          # 업데이트 목록
    ├── FAQ.tsx                # 아코디언 FAQ
    ├── Footer.tsx             # 푸터
    ├── Threads.tsx            # WebGL 배경 셰이더 (OGL)
    ├── Threads.css            # Threads 캔버스 스타일
    └── ui/                    # shadcn/ui 기본 컴포넌트
        ├── accordion.tsx
        ├── badge.tsx
        ├── button.tsx
        ├── card.tsx
        ├── separator.tsx
        ├── sheet.tsx
        └── switch.tsx
```

---

## 페이지 섹션 순서 (App.tsx)

```
Navbar
Hero
AppLauncher        ← 로그인 시에만 렌더링
Charts
SolutionGate
ContactBanner
Changelog + FAQ    ← 2컬럼 그리드
ClientLogos
Footer
```

배경에 `Threads` WebGL 셰이더와 라이트 모드 전용 글래시 orb 애니메이션이 깔려 있습니다.

---

## 주요 규칙 및 패턴

### 스타일링
- Tailwind CSS 4 사용. `@theme inline` 블록에서 디자인 토큰 정의
- 글래스 카드 패턴: `bg-white/30 dark:bg-white/[0.03] backdrop-blur-xl`
- 다크 모드: `dark:` 프리픽스 사용, `.dark` 클래스 기반 (`ThemeProvider`가 `<html>`에 클래스 토글)

### 컬러 정책

모든 색상은 oklch 색공간으로 정의되어 있습니다. (`src/index.css`의 `:root` / `.dark`)

#### 테마 구조
- 라이트 모드: 라벤더-실버 글래시 톤. 배경과 카드에 hue 280(바이올렛) 계열의 미세한 채도를 부여
- 다크 모드: 완전 무채색(chroma 0). 배경 `oklch(0.10)` ~ 카드 `oklch(0.14)` 수준의 플랫 블랙

#### 시맨틱 토큰 (주요)

| 토큰 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--background` | `oklch(0.88 0.02 280)` | `oklch(0.10 0 0)` | 페이지 배경 |
| `--foreground` | `oklch(0.12 0 0)` | `oklch(0.93 0 0)` | 기본 텍스트 |
| `--card` | `oklch(0.96 0.01 280 / 55%)` | `oklch(0.14 0 0)` | 카드 배경 (라이트는 반투명) |
| `--muted-foreground` | `oklch(0.45 0 0)` | `oklch(0.55 0 0)` | 보조 텍스트, 캡션 |
| `--border` | `oklch(0.85 0.015 280 / 50%)` | `oklch(1 0 0 / 8%)` | 테두리 (라이트는 바이올렛 틴트, 다크는 화이트 8%) |
| `--accent` | `oklch(0.92 0.015 280 / 60%)` | `oklch(0.18 0 0)` | 호버, 강조 배경 |
| `--ring` | `oklch(0.6 0.05 280)` | `oklch(0.45 0 0)` | 포커스 링 |
| `--destructive` | `oklch(0.55 0.2 27)` | `oklch(0.65 0.2 22)` | 에러, 삭제 |

#### primary / foreground 반전 패턴
- `--primary`와 `--foreground`가 동일한 값 (라이트: 거의 블랙, 다크: 거의 화이트)
- CTA 버튼, 배너 등에서 `bg-foreground text-background` 패턴으로 반전 사용
- 이 패턴이 프로젝트 전반에 걸쳐 일관되게 적용됨 (Navbar, Hero, ContactBanner, AppLauncher 등)

#### 투명도 기반 표면 처리
컴포넌트에서 직접 사용하는 표면 색상 패턴:

| 패턴 | 용도 |
|------|------|
| `bg-black/[0.04]` / `dark:bg-white/[0.06]` | 네비 pill, 태그 등 미세 배경 |
| `bg-black/[0.06]` / `dark:bg-white/[0.08]` | 앱 런처 버튼, 뱃지 |
| `bg-white/30` / `dark:bg-white/[0.03]` | 글래스 카드 (backdrop-blur와 함께) |
| `bg-foreground text-background` | CTA 버튼, 반전 배너 |

이 패턴은 CSS 변수 대신 Tailwind 유틸리티로 직접 적용됩니다. 새 컴포넌트 추가 시 이 단계를 따라야 일관성이 유지됩니다.

#### 차트 컬러 (Charts.tsx)
차트는 CSS 변수를 사용하지 않고 hex 값을 직접 사용합니다. 모노크롬 그레이스케일 팔레트:

| 용도 | 라이트 | 다크 |
|------|--------|------|
| 강조 (1순위) | `#1a1a1a` | `#e5e5e5` |
| 중간 (2순위) | `#888888` / `#666666` | `#999999` / `#666666` |
| 약한 (3순위) | `#cccccc` / `#aaaaaa` | `#555555` |

`useIsDark()` 헬퍼로 다크 모드를 감지하여 라이트/다크 팔레트를 수동 전환합니다.

#### 배경 효과 컬러
- Threads 셰이더: `color={[0.55, 0.35, 0.85]}` (바이올렛 계열, App.tsx에서 prop 전달)
- 라이트 모드 orb: `rgba(139, 92, 246, 0.08~0.12)` (바이올렛) + `bg-white/90~60` + `bg-black/[0.04~0.05]`
- 다크 모드에서는 orb 비활성 (`dark:hidden`), Threads 셰이더만 `opacity-70`으로 표시

#### CSS 변수에 정의되어 있지만 현재 미사용
`--chart-1` ~ `--chart-5`, `--sidebar-*` 계열 변수는 정의만 되어 있고 실제 컴포넌트에서 참조하지 않습니다. 향후 사이드바나 차트 리팩토링 시 활용 가능합니다.

### 컴포넌트
- 모든 섹션 컴포넌트는 `export default function` 패턴
- Context: `ThemeProvider`, `AuthProvider` 두 개만 존재
- shadcn/ui 컴포넌트는 `@/components/ui/` 경로로 import
- 경로 alias: `@/` → `src/` (vite.config.ts + tsconfig.json)

### 인증
- 현재 데모용 토글 방식 (`AuthProvider`의 `toggleAuth`)
- 실제 인증 연동 시 `AuthProvider` 교체 필요
- `AppLauncher`는 `isLoggedIn` 상태에 따라 조건부 렌더링

---

## 미구현 / 참고사항

| 항목 | 상태 | 비고 |
|------|------|------|
| `Ecosystem` 컴포넌트 | 빈 상태 (`return null`) | 향후 에코시스템 시각화 구현 필요 |
| `SolutionGate` 모달 이미지 | 플레이스홀더 | `public/solutions/` 경로에 이미지 추가 필요 |
| Navbar 내비게이션 | 앵커 링크만 존재 | 라우팅 미적용 (SPA 단일 페이지) |
| Footer 링크 | 모두 `#` | 실제 URL 연결 필요 |
| 인증 | 데모 토글 | 실제 인증 시스템 연동 필요 |
| 공지사항 (AppLauncher) | 하드코딩 | API 연동 또는 CMS 연결 필요 |
| 반응형 | 기본 대응 완료 | 모바일 세부 QA 필요 |

---

## 로컬 실행

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # dist/ 폴더에 빌드
npm run preview   # 빌드 결과 미리보기
```