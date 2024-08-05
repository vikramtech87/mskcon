import Faculty from "./faculty";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const International = () => {
  return (
    <div className="bg-slate-100">
      <SectionContainer title="International faculties">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2">
          <Faculty
            imageUrl="/images/faculties/int1.jpg"
            name="Dr Jason Hornick"
            info="Brigham and Women's hospital, Boston"
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/int2.jpg"
            name="Dr Meera Hameed"
            info="MSKCC, New York"
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/int3.jpg"
            name="Dr Fiona Maclean"
            info="Douglass Hanly Moir Pathology, Sydney"
            isDark={true}
          />
          <Faculty
            imageUrl="/images/faculties/int4.jpg"
            name="Dr Judith Thangaiah"
            info="Mayo Clinic, Rochester"
            isDark={true}
          />
        </div>
        <HomeCta />
      </SectionContainer>
    </div>
  );
};

export default International;
