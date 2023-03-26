import { JSX } from "preact";
import { PersonalInfo, PersonalInfoError } from "./personal-info.ts";
import { TextInput } from "./text-input.tsx";

type Props = {
  onInputChange: JSX.GenericEventHandler<HTMLInputElement>;
  personalInfo: PersonalInfo;
  errors: PersonalInfoError;
};

export const PersonalInfoForm = ({
  onInputChange,
  personalInfo,
  errors,
}: Props) => (
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
        name="name"
        onChange={onInputChange}
        value={personalInfo.name}
        error={errors["name"]}
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
        name="email"
        onChange={onInputChange}
        value={personalInfo.email}
        error={errors["email"]}
      />
      <TextInput
        label="Phone Number"
        type="text"
        name="phone"
        placeholder="e.g. +1 234 567 890"
        onChange={onInputChange}
        value={personalInfo.phone}
        error={errors["phone"]}
      />
    </form>
  </div>
);
