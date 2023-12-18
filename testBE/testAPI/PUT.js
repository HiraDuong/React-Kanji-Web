// testUpdateCourse.js



const updatedCourseData = {
  course_name: 'Updated Course Name',
  description: 'Updated Course Description',
  course_image: 'https://i.ibb.co/YdXnzD3/unnamed.png',
  words: {
    array: [
     0, 1,2,3,4,5,6,7
    ],
  },
};

const updateCourse = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/courseId/19`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCourseData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Course updated successfully:', data.message);
    } else {
      const errorData = await response.json();
      console.error('Error updating course:', errorData.error);
    }
  } catch (error) {
    console.error('Error updating course:', error);
  }
};

// Call the function to update the course
updateCourse();
