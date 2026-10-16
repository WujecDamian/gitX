import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NewSkills } from "./NewSkills";

describe("NewSkills", () => {
  it("shows the skill name", () => {
    render(
      <NewSkills
        id="skill-1"
        content={{ skillName: "TypeScript" }}
        onDelete={vi.fn()}
        onUpdate={vi.fn()}
      />,
    );

    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("tells the parent when Delete is clicked", () => {
    const onDelete = vi.fn();

    render(
      <NewSkills
        id="skill-1"
        content={{ skillName: "TypeScript" }}
        onDelete={onDelete}
        onUpdate={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onDelete).toHaveBeenCalledWith("skill-1");
  });

  it("sends the edited name when Save is clicked", () => {
    const onUpdate = vi.fn();

    render(
      <NewSkills
        id="skill-1"
        content={{ skillName: "TypeScript" }}
        onDelete={vi.fn()}
        onUpdate={onUpdate}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Skill"), { target: { value: "React" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    expect(onUpdate).toHaveBeenCalledWith({ skillName: "React" });
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
