import N1Kanji from './kanji/kanjiN1';
import N2Kanji from './kanji/kanjiN2';
import N3Kanji from './kanji/kanjiN3';
import N4Kanji from './kanji/kanjiN4';
import N5Kanji from './kanji/kanjiN5';
import TotalKanji from './kanji/kanjiTotal';
// Import các file kanji khác nếu cần

const kanjiLevels = {
    'Kanji N1':N1Kanji,
    'Kanji N2':N2Kanji,
    'Kanji N3': N3Kanji,
    'Kanji N4': N4Kanji,
    'Kanji N5': N5Kanji,
    'Kanji Total': TotalKanji
  // Thêm các cấp độ khác nếu cần
};

export default kanjiLevels;
