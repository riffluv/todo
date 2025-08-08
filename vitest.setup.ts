import "@testing-library/jest-dom/vitest";
// a11y matcher を Vitest に拡張
import "vitest-axe/extend-expect";
// 念のため明示登録（型・実行時の両方で確実に適用）
import { expect } from "vitest";
import * as a11yMatchers from "vitest-axe/matchers";
expect.extend(a11yMatchers);
