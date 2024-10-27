import React from "react";
import { useState, useEffect } from "react";
import { getAllTopic } from "@/service/topic";
import { Link } from "react-router-dom";
import { FaEdit, FaPlus } from "react-icons/fa";
import { ITopic } from "@/types/topic";
const Topic = () => {
  const [dataTopic, setDataTopic] = useState<ITopic[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllTopic();
        setDataTopic(data.topics);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);
  console.log(dataTopic);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-medium text-gray-900">
              Danh sách topic
            </h1>
            <Link
              to="/admin/topic/add"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-lg shadow-md transition duration-300 ease-in-out flex items-center"
            >
              <FaPlus className="mr-2" /> Thêm topic
            </Link>
          </div>
          {dataTopic.length === 0 ? (
            <div>
              <h3>Không có sản topic nào</h3>
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <th>STT</th>
                    <th>Name</th>
                    <th>Ngày tạo</th>
                    <th>Cập nhật Topic</th>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dataTopic.map((topic: ITopic, index: number) => {
                      return (
                        <tr
                          key={topic._id}
                          className="hover:bg-gray-50 transition duration-150 ease-in-out"
                        >
                          <td className="px-6 py-4 text-center">{index + 1}</td>
                          <td className="px-6 py-4 text-center">
                            <Link to={`/admin/posts/${topic._id}`}>
                              {topic.name}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {new Date(topic.createdAt).toLocaleString()}
                          </td>
                          <td className="px-6 py-4">
                            <Link
                              to={`/admin/topic/edit/${topic._id}`}
                              className="text-indigo-600 hover:text-indigo-900 "
                            >
                              <FaEdit className="w-5 h-5 ml-20" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topic;
