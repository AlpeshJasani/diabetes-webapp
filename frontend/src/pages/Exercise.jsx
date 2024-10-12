const exerciseSections = [
  {
    sectionTitle: "Exercise for Overweight",
    exercises: [
      {
        title: "Jumping Jacks",
        description: "Full-body cardio workout to burn calories.",
        imageUrl: "/images/Exercise/Jumping Jacks.jpeg.jpg",
        onClick: () =>
          alert(
            "Jumping Jacks are a great full-body exercise that boosts cardiovascular health and burns calories. Perform 3 sets of 20 reps to get your heart rate up and enhance fat burning."
          ),
      },
      {
        title: "Deadlift",
        description: "Strengthen your back and legs.",
        imageUrl: "/images/Exercise/Deadlift.jpeg.jpg",
        onClick: () =>
          alert(
            "The Deadlift is a compound strength training exercise that targets the lower back, hamstrings, and glutes. It helps in building muscle mass, improving metabolism, and enhancing overall strength."
          ),
      },
      {
        title: "Surya Namaskar (Sun Salutation)",
        description: "A series of yoga poses for weight loss.",
        imageUrl: "/images/Exercise/Surya Namaskar (Sun Salutation).jpeg.jpg",
        onClick: () =>
          alert(
            "Surya Namaskar is a comprehensive yoga sequence that involves 12 powerful yoga poses, designed to improve flexibility, strengthen muscles, and burn calories, making it ideal for weight management."
          ),
      },
    ],
  },
  {
    sectionTitle: "Exercise for Stress Reduction",
    exercises: [
      {
        title: "Shavasana (Corpse Pose)",
        description: "Deep relaxation to reduce stress.",
        imageUrl: "/images/Exercise/Shavasana (Corpse Pose).jpg",
        onClick: () =>
          alert(
            "Shavasana is a relaxation pose that helps calm the mind, relax the body, and reduce stress levels. It is usually performed at the end of a yoga session to promote deep relaxation."
          ),
      },
      {
        title: "Bhramari Pranayama (Bee Breathing)",
        description: "A breathing exercise to calm the mind.",
        imageUrl: "/images/Exercise/Bhramari Pranayama (Bee Breathing).webp",
        onClick: () =>
          alert(
            "Bhramari Pranayama involves a humming sound during exhalation, which helps in reducing anxiety, calming the nervous system, and improving mental clarity."
          ),
      },
      {
        title: "Viparita Karani (Legs Up the Wall Pose)",
        description: "Reduces anxiety and improves circulation.",
        imageUrl: "/images/Exercise/Viparita Karani (Legs Up the Wall Pose).webp",
        onClick: () =>
          alert(
            "Viparita Karani is a restorative pose that helps alleviate stress, reduce anxiety, and improve blood circulation by placing the legs up against the wall."
          ),
      },
    ],
  },
];

const ExerciseCard = ({ title, description, imageUrl, onClick }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg overflow-hidden m-4 transform transition duration-500 hover:scale-105 hover:shadow-2xl'>
      <div className='h-80 overflow-hidden flex items-center justify-center'>
        <img className='w-full h-full object-contain' src={imageUrl} alt={title} />
      </div>
      <div className='p-4'>
        <h3 className='font-bold text-lg'>{title}</h3>
        <p className='text-sm mt-2 text-gray-600'>{description}</p>
        <button onClick={onClick} className='mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'>
          Read More
        </button>
      </div>
    </div>
  );
};

const ExerciseSection = ({ sectionTitle, exercises }) => {
  return (
    <div className='my-8'>
      <h2 className='text-2xl font-semibold mb-4'>{sectionTitle}</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} title={exercise.title} description={exercise.description} imageUrl={exercise.imageUrl} onClick={exercise.onClick} />
        ))}
      </div>
    </div>
  );
};

const Exercise = () => {
  return (
    <div className='container mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Exercise for Diabetes: Boosting Health, Managing Blood Sugar</h1>

      {exerciseSections.map((section, index) => (
        <ExerciseSection key={index} sectionTitle={section.sectionTitle} exercises={section.exercises} />
      ))}
    </div>
  );
};

export default Exercise;
