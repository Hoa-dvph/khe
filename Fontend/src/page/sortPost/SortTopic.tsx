import React from "react";
import { FaSortDown } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllTopic } from "@/service/topic";
interface Topic {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  is_hidden: boolean;
}
const SortTopic = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueCheck = e.target.value;
    console.log(e.target.value);
    searchParams.set("topic", valueCheck);
    setSearchParams(searchParams);
  };
  const [topic, setTopic] = useState<Topic[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllTopic();
        console.log(data);
        setTopic(data.topics);
      } catch (error) {
        console.error(error);
        return;
      }
    })();
  }, []);

  return (
    <div className="relative inline-block">
      <select
        className="block appearance-none w-full bg-gray-100 border border-gray-300 hover:border-gray-400 font-semibold cursor-pointer px-4 py-3 pr-8 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        onChange={handleChangeSelect}
      >
        {topic.map((topic) => {
          return (
            <option key={topic._id} value={topic._id}>
              {topic.name}
            </option>
          );
        })}
        {/* <option value="" className="cursor-pointer">
          Chủ đề
        </option> */}
        {/* <option value="createAtNew" className="cursor-pointer">
          Mới nhất
        </option>
        <option value="createAtOld" className="cursor-pointer">
          Cũ nhất
        </option>
        <option value="mostLike" className="cursor-pointer">
          Like nhiều nhất
        </option>
        <option value="leastLike" className="cursor-pointer">
          Like ít nhất
        </option> */}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <FaSortDown className="fill-current h-4 w-4" />
      </div>
    </div>
  );
};

export default SortTopic;
