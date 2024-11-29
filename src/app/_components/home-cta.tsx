"use client";

type HomeCtaProps = {
  prompt?: string;
};

const HomeCta = ({ prompt }: HomeCtaProps) => {
  // const progress = useUserProgress();

  // if (progress === "Loading") {
  //   return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
  // }

  // if (progress === "Register") {
  //   return (
  //     <div className="flex flex-col items-center space-y-2">
  //       {prompt && <div className="text-xl text-foreground">{prompt}</div>}
  //       <Link
  //         href="/auth/register"
  //         className={cn(buttonVariants({ variant: "default" }))}
  //       >
  //         Register
  //       </Link>
  //     </div>
  //   );
  // }

  // if (progress === "Progress") {
  //   return (
  //     <div className="flex flex-col items-center space-y-2">
  //       {prompt && <div className="text-xl text-foreground">{prompt}</div>}
  //       <Link
  //         href="/registration/next"
  //         className={cn(buttonVariants({ variant: "default" }))}
  //       >
  //         Complete registration
  //       </Link>
  //     </div>
  //   );
  // }

  return null;
};

export default HomeCta;
