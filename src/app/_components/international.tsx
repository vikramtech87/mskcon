import Faculty from "./faculty";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const International = () => {
  return (
    <div className="bg-slate-100">
      <SectionContainer title="International faculties">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
          <Faculty
            imageUrl="/images/faculties/rita.jpg"
            name="Dr Rita Alaggio"
            info="Professor, Bambino Gesu Childrens Hosp IRCCS, Pathology Unit, Rome, Italy with expertise in  pediatric onco pathology and special interest in soft tissue tumors;  member of the expert editorial board for World Health Organization (WHO) Classification of Paediatric Tumors."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/jason.jpg"
            name="Dr Jason L. Hornick"
            info="Director of Surgical Pathology and Immunohistochemistry at Brigham and Women's Hospital, Professor of Pathology at Harvard Medical School, and Consultant at the Dana-Farber Cancer Institute with expertise in soft tissue, GI and endocrine pathology; member of the expert editorial board for 5th (2020) edition of the WHO Classification of Tumors of Soft Tissue and Bone."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/meera.jpg"
            name="Dr Meera Hameed"
            info="Chief of Surgical Pathology Service, Attending Pathologist, Memorial Sloan Kettering Cancer Centre with  expertise in surgical pathology with special focus on Bone and Soft Tissue, molecular pathology, digital pathology and clinical cytogenetics."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/fiona.jpeg"
            name="Dr Fiona Maclean"
            info="Clinical Associate Professor and Anatomical Pathologist at Douglass Hanly Moir Pathology with expertise in Bone and Soft tissue pathology, Genitourinary pathology, Cytopathology and Artificial Intelligence in pathology."
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/judith.jpg"
            name="Dr Judith Thangaiah"
            info="Senior Associate Consultant, Mayo clinic with special interest in Bone and Soft tissue pathology and Cytopathology."
            isDark={true}
          />
        </div>
        <HomeCta />
      </SectionContainer>
    </div>
  );
};

export default International;
