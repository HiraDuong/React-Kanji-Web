import N1Kanji from "./kanji/kanjiN1";
import N2Kanji from "./kanji/kanjiN2";
import N3Kanji from "./kanji/kanjiN3";
import N4Kanji from "./kanji/kanjiN4";
import N5Kanji from "./kanji/kanjiN5";
import TotalKanji from "./kanji/kanjiTotal";
// Import các file kanji khác nếu cần

const kanjiLevels = {
  1: N1Kanji,
  2: N2Kanji,
  3: N3Kanji,
  4: N4Kanji,
  5: N5Kanji,
  6: TotalKanji,
  // Thêm các cấp độ khác nếu cần
};

export default kanjiLevels;
