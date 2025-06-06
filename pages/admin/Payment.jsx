// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../../components/Constant/constant";

// function Payment() {
//   const [users, setUsers] = useState([]);
//   const [remarks, setRemarks] = useState({}); // State to store remarks

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     axios
//       .get(`${BASE_URL}/api/admin/payment-history`, {
//         headers: {
//           Authorization: token,
//         },
//       })
//       .then((response) => {
//         console.log(response.data.data);
//         setUsers(response.data.data);
//       })
//       .catch((error) => console.error("Error fetching user data:", error));
//   }, []);

//   const handleRemarkChange = (Id, value) => {
//     setRemarks((prevRemarks) => ({
//       ...prevRemarks,
//       [Id]: value,
//     }));
//   };

//   const handleRemarkSubmit = (Id) => {
//     const token = localStorage.getItem("token");
//     const remark = remarks[Id];

//     axios
//       .post(
//         `${BASE_URL}/api/admin/payment-history-remark`,
//         {
//           Id,
//           remark,
//         },
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       )
//       .then((response) => {
//         console.log("Remark submitted successfully:", response.data);
//         toast.success(response.data.message);
//         // Optionally update UI or provide feedback to the user
//       })
//       .catch((error) => console.error("Error submitting remark:", error));
//   };

//   return (
//     <div className="container mx-auto p-4 text-center">
//       <div className="bg-gray-200 p-4 rounded-lg shadow-md mb-4">
//   <h2 className="text-start text-3xl text-gray-900 font-bold">Paymnet History</h2>
// </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-dark text-black rounded-md text-center">
//           <thead>
//             <tr className="bg-[#5a23b2] text-white">
//               <th className="py-2 px-4">ID</th>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Phone</th>
//               <th className="py-2 px-4">Received Amount</th>
//               <th className="py-2 px-4">Status</th>
//               <th className="py-2 px-4">Remark</th>
//               <th className="py-2 px-4">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index} className="border-t border-gray-700 text-center">
//                 <td className="py-2 px-4">{user.id || "N/A"}</td>
//                 <td className="py-2 px-4">{user.name || "N/A"}</td>
//                 <td className="py-2 px-4">{user.email || "N/A"}</td>
//                 <td className="py-2 px-4">{user.phone || "N/A"}</td>
//                 <td className="py-2 px-4">{user.amount || "N/A"}</td>
//                 <td className="py-2 px-4">{user.status || "N/A"}</td>
//                 <td className="py-2 px-4">
//                   <input
//                     type="text"
//                     className="border-2"
//                     value={remarks[user.id] || user.remark}
//                     onChange={(e) =>
//                       handleRemarkChange(user.id, e.target.value)
//                     }
//                   />
//                 </td>
//                 <td className="py-2 px-4">
//                   <button
//                     onClick={() => handleRemarkSubmit(user.id)}
//                     className="bg-blue-900 text-white px-2 py-1 rounded"
//                   >
//                     Submit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Payment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../components/Constant/constant";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
function Payment() {
  const { t } = useTranslation();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    axios
      .get(`${BASE_URL}/api/admin/transaction-history`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleRemarkChange = (Id, value) => {
    setRemarks((prevRemarks) => ({
      ...prevRemarks,
      [Id]: value,
    }));
  };

  const handleRemarkSubmit = (Id) => {
    const token = localStorage.getItem("token");
    const remark = remarks[Id];

    if (!remark || remark.trim() === "") {
      toast.error(t("admin.payment.remarkEmpty"));
      return;
    }

    axios
      .post(
        `${BASE_URL}/api/admin/payment-history-remark`,
        {
          Id,
          remark,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        console.log("Remark submitted successfully:", response.data);
        toast.success(
          response.data.message || t("admin.payment.remarkSuccess")
        );

        // Update the user data to reflect the new remark
        setUsers(
          users.map((user) =>
            user.id === Id ? { ...user, remark: remark } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error submitting remark:", error);
        toast.error(
          error.response?.data?.message || t("radmin.payment.emarkFailed")
        );
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-[#5a23b2] to-emerald-500 p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-start text-3xl text-white font-bold">
          {t("admin.payment.paymentHistory")}
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a23b2]"></div>
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <svg
            className="w-16 h-16 mx-auto text-[#5a23b2] mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {t("admin.payment.noPaymentFound")}
          </h3>
          <p className="text-gray-600">
            {t("admin.payment.noRecordsAvailable")}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider rounded-tl-lg">
                  {t("admin.payment.id")}
                </th>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                  {t("admin.payment.name")}
                </th>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                  {t("admin.payment.email")}
                </th>
                {/* <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                 {t("admin.payment.phone")}
                </th> */}
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                  {t("admin.payment.planName")}
                </th>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                  {t("admin.payment.status")}
                </th>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider">
                  {t("admin.payment.remark")}
                </th>
                <th className="px-6 py-4 bg-gradient-to-r from-[#5a23b2] to-emerald-500 text-white text-left text-sm font-medium uppercase tracking-wider rounded-tr-lg">
                  {t("admin.payment.action")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-pink-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.user_first_name || "N/A"}{" "}
                    {user.user_last_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.user_email || "N/A"}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.phone || "N/A"}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.plan_name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                        user.status === "Completed"
                          ? "bg-purple-100 text-emerald-500"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#5a23b2] focus:border-transparent"
                      placeholder="Add remark..."
                      value={
                        remarks[user.id] !== undefined
                          ? remarks[user.id]
                          : user.remark || ""
                      }
                      onChange={(e) =>
                        handleRemarkChange(user.id, e.target.value)
                      }
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleRemarkSubmit(user.id)}
                      className="bg-gradient-to-r from-[#5a23b2] to-emerald-500 hover:from-pink-600 hover:to-pink-800 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5a23b2] focus:ring-opacity-50"
                    >
                      {t("admin.payment.submit")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Payment;
