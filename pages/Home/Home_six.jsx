import React from "react";
import { useTranslation } from "react-i18next";
import PricingSection from "../../components/Pricing/PricingPlan";
import { Link } from "react-router-dom";
import { useRouter } from "next/router";

const Home_six = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <div className="py-16 bg-gradient-to-t from-zinc-300 via-emerald-500 to-[#5a23b2] ">
      <div className="mx-auto max-w-screen-lg text-center mb-12">
        <h2 className="mb-6 text-4xl font-extrabold text-emerald-500 tracking-tight border p-4 rounded-2xl border-gray-200">
          {t("choose_plan")}
        </h2>
      </div>

      {/* Pricing Section */}
      <PricingSection />

      <div className="text-center">
        <button
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-[#5a23b2] rounded-xl hover:bg-emerald-500 transition duration-300 "
          onClick={() => router.push("/pricing")}
        >
          View all plans
        </button>
      </div>

      {/* Button for routing to Pricing page */}
      {/* <div className="text-center mt-8">
        <Link 
          to="/pricing" 
          className="inline-block px-8 py-3 text-lg font-medium text-white bg-emerald-500 rounded-xl hover:bg-[#019b73] transition duration-300"
        >
          {t("view_all_plans")}
        </Link>
      </div> */}
    </div>
  );
};

export default Home_six;
