import Faculty from "./faculty";
import FacultyContainer from "./faculty-container";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const National = () => {
  return (
    <SectionContainer title="National faculties">
      <FacultyContainer>
        <Faculty
          imageUrl="/images/faculties/nirmala.jpeg"
          name="Dr Nirmala Jambhekar"
          info="Professor and former head, Tata Memorial Centre, Mumbai with expertise in Bone and Soft tissue pathology, Lung and Mediastinal tumours."
          isDark={false}
        />
        <Faculty
          imageUrl="/images/faculties/jayasree.png"
          name="Dr Jayasree Kattoor"
          info="Professor and former Head, Regional Cancer Centre, Trivandrum with expertise in Bone and Soft tissue pathology and Cytopathology."
          isDark={false}
        />
        <Faculty
          imageUrl="/images/faculties/rekhi.png"
          name="Dr Bharat Rekhi"
          info="Professor, Tata Memorial Centre, Mumbai, with expertise in Soft Tissue and Bone Tumors, Gynaecologic pathology, Molecular Pathology and Cytopathology."
          isDark={false}
        />
      </FacultyContainer>
      <HomeCta />
    </SectionContainer>
  );
};

export default National;
