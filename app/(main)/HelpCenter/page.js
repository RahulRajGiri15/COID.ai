"use client";
import React from "react";
import { HelpCircle } from "lucide-react";

const HelpCenter = () => {
  return (
    <div className="bg-black min-h-screen flex items-center justify-center py-5 text-white">
      <div className="max-w-4xl mx-auto p-8 bg-gray-900 rounded-2xl shadow-2xl space-y-8">
        <h2 className="text-3xl font-semibold text-center text-gray-100 mt-2">
          Help Center
        </h2>
        <div className="space-y-6">
          {/* FAQ Section */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-medium text-gray-100 mb-4">
              Frequently Asked Questions (FAQ)
            </h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start space-x-2">
                <HelpCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <strong className="text-gray-100">
                    How can I download the project files?
                  </strong>
                  <p>
                    To download the project files, click on the "Export" button.
                    You will be redirected to the sandbox environment, where you
                    can access and download the project files.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <HelpCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <strong className="text-gray-100">
                    How can I share my projects?
                  </strong>
                  <p>
                    To share your project, click on the "Deploy" button. You
                    will receive a link that can be shared with others. Once
                    they click on the link, they will be able to access your
                    project.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Support Section */}
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-medium text-gray-100 mb-4">
              Contact Support
            </h3>
            <p className="text-gray-300">
              If you have any issues that are not covered in the FAQ, please
              contact our support team. You can send us an email at{" "}
              <a
                href="mailto:nishantkr2003nna@gmail.com"
                className="text-blue-400 hover:text-blue-600 transition duration-300"
              >
                nishantkr2003nna@gmail.com
              </a>
              .
            </p>
          </div>
        </div>

        {/* Additional Support Section */}
        <div className="text-center">
          <p className="text-gray-300">
            Need help with something else? Feel free to{" "}
            <a
              href="https://kumarnishant.netlify.app/"
              className="text-blue-400 hover:text-blue-600 transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              reach out to us{" "}
            </a>
            and we'll be happy to assist you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
