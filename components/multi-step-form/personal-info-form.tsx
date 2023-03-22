import { TextInput } from "./text-input.tsx";

export const PersonalInfoForm = () => (
  <div class="animation-in">
    <h2 class="t-denim form-title">Personal info</h2>
    <p class="t-gray">
      Please provide your name, email address, and phone number.
    </p>
    <form class="flex flex-col personal-info-inputs">
      <TextInput
        label="Name"
        type="text"
        placeholder="e.g. Stephen King"
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
      />
      <TextInput
        label="Phone Number"
        type="text"
        placeholder="e.g. +1 234 567 890"
      />
    </form>
  </div>
);
