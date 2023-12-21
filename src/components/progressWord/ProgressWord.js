import "./ProgressWord.css";

const ProgressWord = ({ word }) => {
  return (
    <div id="word-container">
      <div id="title">{word.kanji ? word.kanji : "Kanji"}</div>
      <div id="word-info-container">
        <div id="meaning">
          <p style={{ width: "100px", textAlign: "left" }}>Nghĩa:</p>{" "}
          {word.meaning}
        </div>
        <div id="pronunce">
          <p style={{ width: "100px", textAlign: "left" }}>Phát âm:</p>{" "}
          {word.pronounce}
        </div>
        <div id="pronunce">
          <p style={{ width: "100px", textAlign: "left" }}>Ví dụ:</p>{" "}
          {word.example}
        </div>
      </div>
      <img
        id="image-container"
        src={word.image ? word.image : "/image/default_img.png"}
        alt={`Image for ${word.kanji}`}
      />
    </div>
  );
};

export default ProgressWord;
