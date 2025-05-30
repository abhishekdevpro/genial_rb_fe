import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../components/Constant/constant";
import { useTranslation } from "react-i18next";

function Addreferall() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const { i18n, t } = useTranslation();
  const language = i18n.language;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    const referralData = { name, phone, email, remark };

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/add-referral?lang=${language}`,
        referralData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Referral added successfully!");
        setName("");
        setPhone("");
        setEmail("");
        setRemark("");
      } else {
        toast.error("Failed to add referral. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white">
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <div className="w-full lg:w-3/4 xl:w-2/3">
                <div className="shadow-lg p-6 bg-white">
                  <h5 className="text-2xl font-bold mb-6">👥 Add Referral</h5>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="remark"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Remark
                      </label>
                      <textarea
                        id="remark"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 h-32 rounded-md shadow-sm p-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full bg-white text-blue-800 border-blue-800 border-2 px-6 py-3 rounded-lg font-bold "
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Addreferall;
