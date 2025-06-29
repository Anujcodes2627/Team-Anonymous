// import React, { useState } from "react";
// import axios from "axios";

// export default function WasteClassifier() {
//   const [file, setFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const extractVideoId = (url) => {
//     const regExp =
//       /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
//     const match = url.match(regExp);
//     return match ? match[1] : null;
//   };
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/classifywaste",
//         formData
//       );
//       setResult(res.data);
//     } catch (err) {
//       alert("Something went wrong. Please try again.");
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//     setPreviewUrl(URL.createObjectURL(selectedFile));
//   };

//   return (
//     <div className="bg-black text-wheat font-serif min-h-screen">
//       <div className="container mx-auto px-4 py-8">
//         <div className="bg-[#1c1f26] p-8 rounded-lg shadow-lg max-w-xl mx-auto">
//           <h2 className="text-4xl text-blue-300 font-bold text-center mb-6">
//             Classify Your Waste
//           </h2>
//           <form onSubmit={handleUpload} className="text-center">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="text-black border-2 mt-10  bg-amber-200 mb-10 rounded-2xl w-full"
//               required
//             />
//             <br />
//             <button
//               type="submit"
//               className="bg-wheat  bg-white text-[#232a34] font-bold px-6 py-2 rounded-xl hover:bg-yellow-300 transition-all"
//             >
//               Classify Waste
//             </button>
//           </form>

//           {previewUrl && (
//             <div className="mt-6 text-center">
//               <p className="mb-2 text-lg">Uploaded Image Preview:</p>
//               <img
//                 src={previewUrl}
//                 alt="Uploaded preview"
//                 className="mx-auto max-w-xs rounded shadow-md"
//               />
//             </div>
//           )}

//           {loading && (
//             <div className="text-center mt-6">
//               <p className="text-xl text-white animate-pulse">
//                 Analyzing your waste image...
//               </p>
//             </div>
//           )}

//           {/* {result && (
//             <div className="mt-10 bg-[#2b2f3a] p-6 rounded-lg">
//               <h3 className="text-2xl  font-bold mb-4">
//                 <p className="text-white mb-4">Prediction:</p> <p className="underline ">{result.predicted_value}</p>
//               </h3>
//               <p className="mb-4 text-blue-200">{result.details}</p>
//               <div className="flex flex-col md:flex-row gap-4 justify-center">
//                 <video
//                   src={result.video1}
//                   controls
//                   width="300"
//                   className="rounded shadow"
//                 />
//                 <video
//                   src={result.video2}
//                   controls
//                   width="300"
//                   className="rounded shadow"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div> */}
//           {result && (
//             <div className="mt-10 bg-[#2b2f3a] p-6 rounded-lg">
//               <h3 className="text-2xl font-bold mb-4 text-white">
//                 Prediction:
//               </h3>
//               <p className="underline text-xl text-green-300 mb-4">
//                 {result.predicted_value}
//               </p>
//               <p className="mb-4 text-blue-200">{result.details}</p>

//               <div className="flex flex-col md:flex-row gap-4 justify-center">
//                 {/* Video 1 */}
//                 {result.video1 && extractVideoId(result.video1) ? (
//                   <iframe
//                     src={`https://www.youtube.com/embed/${extractVideoId(
//                       result.video1
//                     )}`}
//                     width="300"
//                     height="200"
//                     className="rounded shadow"
//                     allowFullScreen
//                   ></iframe>
//                 ) : (
//                   <video
//                     src={result.video1}
//                     controls
//                     width="300"
//                     className="rounded shadow"
//                   />
//                 )}

//                 {/* Video 2 */}
//                 {result.video2 && extractVideoId(result.video2) ? (
//                   <iframe
//                     src={`https://www.youtube.com/embed/${extractVideoId(
//                       result.video2
//                     )}`}
//                     width="300"
//                     height="200"
//                     className="rounded shadow"
//                     allowFullScreen
//                   ></iframe>
//                 ) : (
//                   <video
//                     src={result.video2}
//                     controls
//                     width="300"
//                     className="rounded shadow"
//                   />
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-[#232a34] mt-12 text-center py-6 text-wheat">
//         <p className="text-lg font-semibold">
//           Built with ❤️ for a cleaner tomorrow.
//         </p>
//         <p className="mt-2 bg-[#0b2438] p-2">
//           Learn from Mistakes and Live for Today.
//         </p>
//       </footer>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";

export default function WasteClassifier() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/classifywaste",
        formData
      );
      setResult(res.data);
    } catch (err) {
      alert("Something went wrong. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  return (
    <div className="bg-black text-wheat font-serif min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#1c1f26] p-8 rounded-lg shadow-lg max-w-xl mx-auto">
          <h2 className="text-4xl text-blue-300 font-bold text-center mb-6">
            Classify Your Waste
          </h2>

          {/* Upload Form */}
          <form onSubmit={handleUpload} className="text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-black border-2 mt-10 bg-amber-200 mb-10 rounded-2xl w-full"
              required
            />
            <br />
            <button
              type="submit"
              className="bg-white text-[#232a34] font-bold px-6 py-2 rounded-xl hover:bg-yellow-300 transition-all"
            >
              Classify Waste
            </button>
          </form>

          {/* Preview */}
          {previewUrl && (
            <div className="mt-6 text-center">
              <p className="mb-2 text-lg">Uploaded Image Preview:</p>
              <img
                src={previewUrl}
                alt="Uploaded preview"
                className="mx-auto max-w-xs rounded shadow-md"
              />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center mt-6">
              <p className="text-xl text-white animate-pulse">
                Analyzing your waste image...
              </p>
            </div>
          )}

          {/* Result */}
          {result && (
            <div className="mt-10 bg-[#2b2f3a] p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 text-white">Prediction:</h3>
              <p className="underline text-xl text-green-300 mb-4">
                {result.predicted_value}
              </p>
              <p
                className="mb-4 text-blue-200"
                dangerouslySetInnerHTML={{ __html: result.details }}
              ></p>

              <div className="flex flex-col md:flex-row gap-4 justify-center">
                {/* YouTube Embeds */}
                <iframe
                  src={`https://www.youtube.com/embed/${result.video1}`}
                  width="300"
                  height="200"
                  className="rounded shadow"
                  allowFullScreen
                ></iframe>

                <iframe
                  src={`https://www.youtube.com/embed/${result.video2}`}
                  width="300"
                  height="200"
                  className="rounded shadow"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#232a34] mt-12 text-center py-6 text-wheat">
        <p className="text-lg font-semibold">
          Built with ❤️ for a cleaner tomorrow.
        </p>
        <p className="mt-2 bg-[#0b2438] p-2">
          Learn from Mistakes and Live for Today.
        </p>
      </footer>
    </div>
  );
}
