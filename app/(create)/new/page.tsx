import NewFireworkForm from "@/components/NewFireworkForm/NewFireworkForm";

const NewFireworkPage = () => {
  return (
    <div className="flex flex-col justify-center py-10 mt-10">
      <h2 className="text-center text-2xl font-bold">花火を打ち上げましょう！</h2>
      <NewFireworkForm />
    </div>
  );
};

export default NewFireworkPage;