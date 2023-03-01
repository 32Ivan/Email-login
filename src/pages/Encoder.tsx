import { useEffect, useState } from "react";
import { encode, setStrToNull } from "../store/features/encodeSlice";
import Cookies from "universal-cookie";
import { encodedValue } from "./UserType";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUserToNull } from "../store/features/loginSlice";

function Encoder() {
  const [encodedValue, setEncodedValue] = useState<encodedValue>({});
  const dispatch = useAppDispatch();
  const encoded = useAppSelector((state) => state.str.str);
  const cookies = new Cookies();

  const onClick = () => {
    cookies.remove("cookies");
    dispatch(setUserToNull());
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEncodedValue((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (encoded.length > 0) {
      dispatch(setStrToNull());
    }
    dispatch(encode(JSON.stringify(encodedValue)));
  };

  useEffect(() => {}, [encoded]);
  return (
    <>
      <button
        onClick={() => onClick()}
        className="absolute top-0 right-0 inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md"
      >
        Logout
      </button>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <form action="" className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="data"
                  className="text-sm font-bold text-gray-900 block"
                >
                  Enter data
                </label>
                <input
                  type="text"
                  id="str"
                  value={encodedValue.str}
                  onChange={onChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 "
                />
              </div>

              <div>
                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">
                  Submit
                </button>
              </div>
              {encoded.length > 0 && (
                <div className="max-w-md w-full mx-auto  p-2 ">
                  The result is: {encoded}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Encoder;
