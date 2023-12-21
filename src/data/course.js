import N1Kanji from "./kanji/kanjiN1";
import N2Kanji from "./kanji/kanjiN2";
import N3Kanji from "./kanji/kanjiN3";
import N4Kanji from "./kanji/kanjiN4";
import N5Kanji from "./kanji/kanjiN5";

const course = [
  {
    name: "Kanji N5",
    decription: "this is for N5 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: [
      {
        kanji: "日",
        meaning: "sun",
        pronunce: "nichi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "本",
        meaning: "book",
        pronunce: "hon",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "山",
        meaning: "mountain",
        pronunce: "yama",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "人",
        meaning: "person",
        pronunce: "jin",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "学校",
        meaning: "school",
        pronunce: "gakkou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "犬",
        meaning: "dog",
        pronunce: "inu",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      // Thêm các mục khác nếu cần
      {
        kanji: "一",
        meaning: "one",
        pronunce: "ichi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "二",
        meaning: "two",
        pronunce: "ni",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "三",
        meaning: "three",
        pronunce: "san",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "四",
        meaning: "four",
        pronunce: "shi/yon",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "五",
        meaning: "five",
        pronunce: "go",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "六",
        meaning: "six",
        pronunce: "roku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "七",
        meaning: "seven",
        pronunce: "shichi/nana",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "八",
        meaning: "eight",
        pronunce: "hachi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "九",
        meaning: "nine",
        pronunce: "kyuu/ku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "十",
        meaning: "ten",
        pronunce: "juu",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
    ],
  },
  {
    name: "Kanji N4",
    decription: "this is for N4 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: [
      {
        kanji: "時間",
        meaning: "time",
        pronunce: "jikan",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "友達",
        meaning: "friend",
        pronunce: "tomodachi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "食べ物",
        meaning: "food",
        pronunce: "tabemono",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "勉強",
        meaning: "study",
        pronunce: "benkyou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "動物",
        meaning: "animal",
        pronunce: "doubutsu",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "言葉",
        meaning: "language",
        pronunce: "kotoba",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "家族",
        meaning: "family",
        pronunce: "kazoku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "映画",
        meaning: "movie",
        pronunce: "eiga",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "電話",
        meaning: "telephone",
        pronunce: "denwa",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "天気",
        meaning: "weather",
        pronunce: "tenki",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
    ],
  },
  {
    name: "Kanji N3",
    decription: "this is for N3 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: [
      {
        kanji: "旅行",
        meaning: "travel",
        pronunce: "ryokou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "心配",
        meaning: "worry",
        pronunce: "shinpai",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "成功",
        meaning: "success",
        pronunce: "seikou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "計画",
        meaning: "plan",
        pronunce: "keikaku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "問題",
        meaning: "problem",
        pronunce: "mondai",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "理由",
        meaning: "reason",
        pronunce: "riyuu",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "運動",
        meaning: "exercise",
        pronunce: "undou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "夢",
        meaning: "dream",
        pronunce: "yume",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "体験",
        meaning: "experience",
        pronunce: "taiken",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "努力",
        meaning: "effort",
        pronunce: "doryoku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
    ],
  },
  {
    name: "Kanji N2",
    decription: "this is for N2 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: [
      {
        kanji: "総理大臣",
        meaning: "Prime Minister",
        pronunce: "souri daishin",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "外交",
        meaning: "diplomacy",
        pronunce: "gaikou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "事業",
        meaning: "enterprise",
        pronunce: "jigyou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "相続",
        meaning: "inheritance",
        pronunce: "souzoku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "就職",
        meaning: "employment",
        pronunce: "shuushoku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "態度",
        meaning: "attitude",
        pronunce: "taido",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "発展",
        meaning: "development",
        pronunce: "hatten",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "証明",
        meaning: "proof",
        pronunce: "shoumei",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "連絡",
        meaning: "contact",
        pronunce: "renraku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "説明",
        meaning: "explanation",
        pronunce: "setsumei",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
    ],
  },
  {
    name: "Kanji N1",
    decription: "this is for N1 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: [
      {
        kanji: "経済",
        meaning: "economy",
        pronunce: "keizai",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "政治",
        meaning: "politics",
        pronunce: "seiji",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "環境",
        meaning: "environment",
        pronunce: "kankyou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "科学",
        meaning: "science",
        pronunce: "kagaku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "文化",
        meaning: "culture",
        pronunce: "bunka",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "歴史",
        meaning: "history",
        pronunce: "rekishi",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "教育",
        meaning: "education",
        pronunce: "kyouiku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "技術",
        meaning: "technology",
        pronunce: "gijutsu",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "社会",
        meaning: "society",
        pronunce: "shakai",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "医学",
        meaning: "medicine",
        pronunce: "igaku",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
      {
        kanji: "事業",
        meaning: "business",
        pronunce: "jigyou",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9yx3AncOfdCVaPHU9s1NnUN2Zp7Wcpmx1g&usqp=CAU",
      },
    ],
  },
  {
    name: "Kanji Total",
    decription: "this is for N5-N1 level",
    image: "https://i.redd.it/v88lpnp2gok61.png",
    word: N1Kanji.concat(N2Kanji, N3Kanji, N4Kanji, N5Kanji),
  },
];

export default course;
