import { useParams, useNavigate } from 'react-router-dom';
import course from '../data/course';

import '../css/courseProgress.css'
import N1Kanji from '../data/kanji/kanjiN1';
import ProgressWord from '../components/progressWord/ProgressWord';

function CourseProgress() {
  const { level } = useParams();
  // Tìm khóa học có name bằng giá trị của level
  const Course = course.find(item => item.name === (level || "Kanji Total"));


    return (
      <div className='page'>
        <div className='header-container'>
          <div className='title-container'>
            Tên khóa học : {level|| "Total Kanji"}
          </div>
          <div className='info-container'>

            <div className='description-container'>
            <div className='text'>Mô tả:</div>
            <div className='description--'> 
            {Course.decription}
            </div>
            </div>
            <div className='image-container-prg'>
            <img src={Course.image} alt={`Image for ${Course.name}`} />
            </div>
          </div>
        <div className='progress-btn-container'>
        <a href={`/learning/${level||'Kanji Total'}`}>
              <button className='progress-btn'>
                HỌC
              </button>
              </a> 
              <a href={'/coursePage'}>
              <button className='progress-btn'>
                THOÁT
              </button>
              </a> 
        </div>

        </div>
        <div className='remember-container'>
        <div className='progress-title'>
           Từ đã nhớ
          </div>  
        {N1Kanji.map(N1Kanji => (
        <ProgressWord
        word={N1Kanji}
        />
      ))}
        </div>

        <div className='forgot-container'>
        <div className='progress-title'>
           Từ chưa nhớ
          </div>  
        {N1Kanji.map(N1Kanji => (
        <ProgressWord
        word={N1Kanji}
        />
      ))}
        </div>

      </div>
    );
  }
  
  export default CourseProgress;
  