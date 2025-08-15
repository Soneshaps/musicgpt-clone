const Description = ({ description }: { description: string }) => {
  return (
    <div className="mt-4 text-center">
      <p className="text-sm text-neutral-sub-text">{description}</p>
    </div>
  );
};

export default Description;
