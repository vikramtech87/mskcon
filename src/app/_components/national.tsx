import Faculty from "./faculty";
import HomeCta from "./home-cta";
import SectionContainer from "./section-container";

const National = () => {
  return (
    <SectionContainer title="National faculties">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-4 gap-x-2">
        <Faculty
          imageUrl="/images/faculties/nat1.jpg"
          name="Dr Bharat Rekhi"
          info="Tata Memorial Hospital, Mumbai"
          isDark={false}
        />
      </div>
      <HomeCta />
    </SectionContainer>
  );
};

export default National;
