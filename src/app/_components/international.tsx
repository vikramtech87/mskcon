import Faculty from "./faculty";
import FacultyContainer from "./faculty-container";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const International = () => {
  return (
    <div className="bg-slate-100">
      <SectionContainer title="International faculty">
        <FacultyContainer>
          <Faculty
            imageUrl="/images/faculties/fiona.jpeg"
            name="Dr Fiona Maclean"
            info="Clinical Associate Professor and Anatomical Pathologist at Douglass Hanly Moir Pathology, Sydney, Australia with expertise in Bone and Soft tissue pathology, Genitourinary pathology, Cytopathology and Artificial Intelligence in pathology."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/jason.jpg"
            name="Dr Jason L. Hornick"
            info="Director of Surgical Pathology and Immunohistochemistry at Brigham and Women&#39;s Hospital, Professor of Pathology at Harvard Medical School, and Consultant at the Dana-Farber Cancer Institute, Boston, USA with expertise in soft tissue, GI and endocrine pathology; expert member of editorial board for World Health Organization (WHO) Classification of Tumors of Soft Tissue and Bone, 5th edition."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/judith_2.jpg"
            name="Dr Judith Thangaiah"
            info="Consultant, Mayo clinic, Rochester, Minnesota, USA with expertise in Bone and Soft tissue pathology and Cytopathology."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/meera.jpg"
            name="Dr Meera Hameed"
            info="Chief of Surgical Pathology Service, Attending Pathologist, Memorial Sloan Kettering Cancer Centre, New York, USA with expertise in surgical pathology and special focus on Bone and Soft Tissue, molecular pathology, digital pathology and clinical cytogenetics."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/rita.jpg"
            name="Dr Rita Alaggio"
            info="Professor, Bambino Gesu Childrens Hosp IRCCS, Pathology Unit, Rome, Italy, with expertise in pediatric-oncopathology and special interest in Soft tissue tumors; expert member of editorial board for World Health Organization (WHO) Classification of Paediatric Tumors."
            isDark={true}
          />
        </FacultyContainer>
        <HomeCta />
      </SectionContainer>
    </div>
  );
};

export default International;
