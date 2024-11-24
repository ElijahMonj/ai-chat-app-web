'use client';

const PrivacyTerms = () => {
    return (
        <>
            <div className="mt-auto w-full text-center text-sm mb-2 flex justify-center items-center gap-2">
                <button
                    className="link link-hover"
                    onClick={() => (document.getElementById("modal_privacy") as HTMLDialogElement)?.showModal()}
                >
                    Privacy Policy
                </button>
                <span className="mx-1">|</span>
                <button
                    className="link link-hover"
                    onClick={() => (document.getElementById("modal_terms") as HTMLDialogElement)?.showModal()}
                >
                    Terms of Service
                </button>
            </div>

            {/* Privacy Policy Modal */}
            <dialog id="modal_privacy" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-4xl">
                    <h3 className="font-bold text-xl mb-4">Privacy Policy</h3>
                    <div className="overflow-y-auto max-h-[60vh]">
                        <p className="text-sm mb-4">
                            Welcome to NeoPal! We prioritize your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.
                        </p>
                        <h4 className="font-semibold mt-4 mb-2">1. Information We Collect</h4>
                        <p className="text-sm">
                            We collect the following types of information:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Account Information: Your name, email address, and password when you create an account.</li>
                            <li>• Usage Data: Details of your interactions with the platform, such as chats, searches, and AI creations.</li>
                            <li>• Device Information: IP address, browser type, and operating system for analytics and security purposes.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">2. How We Use Your Information</h4>
                        <p className="text-sm">
                            We use your information to:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Provide, maintain, and improve our services.</li>
                            <li>• Authenticate your identity and secure your account.</li>
                            <li>• Personalize your experience on the platform.</li>
                            <li>• Communicate with you about updates, features, or issues.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">3. Data Sharing</h4>
                        <p className="text-sm">
                            We do not sell your personal data to third parties. However, we may share your information with trusted service providers to:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Facilitate platform functionality, such as hosting and analytics.</li>
                            <li>• Comply with legal obligations or protect against harm to users or the platform.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">4. Cookies and Tracking Technologies</h4>
                        <p className="text-sm">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Enhance your experience by remembering preferences.</li>
                            <li>• Collect analytics to improve the platform.</li>
                        </ul>
                        <p className="text-sm">
                            You can manage cookie preferences in your browser settings.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">5. Data Retention</h4>
                        <p className="text-sm">
                            We retain your data for as long as necessary to provide our services or comply with legal obligations. You may request deletion of your data at any time by contacting us at{" "}
                            <a href="mailto:monjardinelijah120@gmail.com" className="text-blue-600 underline">
                                monjardinelijah120@gmail.com
                            </a>.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">6. Your Rights</h4>
                        <p className="text-sm">
                            Depending on your jurisdiction, you may have the right to:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Access, correct, or delete your personal data.</li>
                            <li>• Withdraw consent for certain uses of your data.</li>
                            <li>• File a complaint with a data protection authority.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">7. Security</h4>
                        <p className="text-sm">
                            We implement industry-standard measures to protect your personal information. However, no system is entirely secure, and we cannot guarantee absolute data security.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">8. Changes to This Policy</h4>
                        <p className="text-sm">
                            We may update this Privacy Policy periodically. We encourage you to review it regularly to stay informed about our practices.
                        </p>

                        <p className="text-sm mt-4">
                            <strong>Effective Date:</strong> November 23, 2024
                        </p>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => (document.getElementById("modal_privacy") as HTMLDialogElement)?.close()}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>

            {/* Terms of Service Modal */}
            <dialog id="modal_terms" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-4xl">
                    <h3 className="font-bold text-xl mb-4">Terms of Service</h3>
                    <div className="overflow-y-auto max-h-[60vh]">
                        <p className="text-sm mb-4">
                            Welcome to NeoPal! By using our platform, you agree to comply with the following Terms of Service.
                        </p>
                        <h4 className="font-semibold mt-4 mb-2">1. Acceptance of Terms</h4>
                        <p className="text-sm">
                            By creating an account or using NeoPal, you confirm that you are at least 13 years old and have the legal capacity to agree to these Terms.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">2. Services Provided</h4>
                        <p className="text-sm">
                            NeoPal provides a platform where users can:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Chat with predefined AI personalities.</li>
                            <li>• Create and customize their own AI profiles.</li>
                            <li>• Search for and interact with AI personalities created by other users.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">3. User Responsibilities</h4>
                        <p className="text-sm">
                            By using NeoPal, you agree to:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Provide accurate and truthful information during registration.</li>
                            <li>• Maintain the confidentiality of your login credentials.</li>
                            <li>• Use the platform in compliance with applicable laws and these Terms.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">4. Prohibited Activities</h4>
                        <p className="text-sm">
                            You may not:
                        </p>
                        <ul className="pl-5 text-sm">
                            <li>• Use the platform to harass, harm, or defame others.</li>
                            <li>• Upload or share offensive, explicit, or copyrighted content without authorization.</li>
                            <li>• Attempt to exploit vulnerabilities, disrupt functionality, or reverse-engineer the platform.</li>
                        </ul>

                        <h4 className="font-semibold mt-4 mb-2">5. Intellectual Property</h4>
                        <p className="text-sm">
                            All platform content, designs, and code are the property of NeoPal or its licensors. Users retain ownership of the AI profiles or content they create but grant NeoPal a non-exclusive, worldwide license to display, distribute, and promote it as part of the platform.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">6. Termination of Use</h4>
                        <p className="text-sm">
                            We reserve the right to suspend or terminate accounts for violations of these Terms or for behavior that we deem harmful to the platform or its users.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">7. Limitation of Liability</h4>
                        <p className="text-sm">
                            The platform is provided “as is.” To the fullest extent permitted by law, NeoPal disclaims all warranties and is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.
                        </p>

                        <h4 className="font-semibold mt-4 mb-2">8. Changes to These Terms</h4>
                        <p className="text-sm">
                            We may revise these Terms periodically. Continued use of NeoPal after changes are posted constitutes acceptance of the revised Terms.
                        </p>

                        <p className="text-sm mt-4">
                            <strong>Effective Date:</strong> November 23, 2024
                        </p>
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" onClick={() => (document.getElementById("modal_terms") as HTMLDialogElement)?.close()}>
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default PrivacyTerms;
