import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

type GoogleButtonProps = {
  onFail: () => void; // Define the type for the onFail function
};

// The main GoogleButton component
export function GoogleButton( {onFail}: GoogleButtonProps) {
  /**
   * Handles successful Google login.
   * @param credentialResponse - The response returned from Google after login.
   */
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log("Google Sign-In Success:", credentialResponse);
    localStorage.setItem(
      'jwtToken',
      credentialResponse.credential as string
    ); // Store JWT token
    window.location.href = '/'; // Navigate to the home page
  };

  /**
   * Handles login failure or errors.
   */
  const handleError = () => {
    onFail();
    console.error("Google Sign-In Failed");
  };

  return (
    // Flex container to center the Google Login button using Tailwind CSS
    <div className="flex justify-center w-full px-4 py-2 max-w-sm mx-auto">
      <GoogleLogin
        onSuccess={handleSuccess} // Called when login is successful
        onError={handleError}     // Called when login fails
        theme="filled_black"      // Button theme style (black background)
        shape="pill"              // Button shape (pill-rounded edges)
        text="continue_with"      // Button text (e.g., "Continue with Google")
        useOneTap={false}         // Disables One Tap login feature
        locale="he"               // Language of the button (English)
      />
    </div>
  );
}
