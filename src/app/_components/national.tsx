import Faculty from "./faculty";
import FacultyContainer from "./faculty-container";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const National = () => {
  return (
    <SectionContainer title="National faculty">
      <FacultyContainer>
        <Faculty
          imageUrl="/images/faculties/rekhi.png"
          name="Dr Bharat Rekhi"
          info="Professor, Tata Memorial Hospital, Mumbai, India, with expertise in Bone and Soft tissue pathology, Gynaecologic pathology, Molecular Pathology and Cytopathology."
          isDark={false}
        />
        <Faculty
          imageUrl="/images/faculties/jayasree.png"
          name="Dr Jayasree Kattoor"
          info="Professor and former Head, Regional Cancer Centre, Trivandrum, India, with expertise in Bone and Soft tissue pathology and Cytopathology."
          isDark={false}
        />
        <Faculty
          imageUrl="/images/faculties/nirmala_1.jpeg"
          name="Dr Nirmala Jambhekar"
          info="Professor and former head, Tata Memorial Hospital, Mumbai, India, with expertise in Bone and Soft tissue pathology, Lung and Mediastinal tumours."
          isDark={false}
        />
      </FacultyContainer>
      <HomeCta />
    </SectionContainer>
  );
};

export default National;
