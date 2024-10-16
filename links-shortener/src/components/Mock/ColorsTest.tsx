import { Button } from "../ui/button";

const ColorsTest = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="h-12 bg-background">bg-background</div>
      <div className="h-12 bg-primary">bg-primary</div>
      <div className="h-12 bg-secondary">bg-secondary</div>
      <div className="h-12 bg-destructive">bg-destructive</div>
      <div className="h-12 bg-accent">bg-accent</div>
      <div className="h-12 bg-foreground">bg-foreground</div>
      <div className="h-12 bg-muted">bg-muted</div>
      <div className="h-12 bg-border">bg-border</div>
      <div className="h-12 bg-card">bg-card</div>
      <div className="h-12 bg-accent">bg-accent</div>
      <div className="h-12 bg-popover">bg-popover</div>
      <div className="flex flex-row ">
        <Button variant={"default"}>default</Button>
        <Button variant={"outline"}>outline</Button>
        <Button variant={"destructive"}>destructive</Button>
        <Button variant={"ghost"}>ghost</Button>
        <Button variant={"secondary"}>secondary</Button>
        <Button variant={"link"}>link</Button>
      </div>
      <div className="h-12 bg-ring">bg-ring</div>
      <div className="h-12 bg-input">bg-ring</div>
      <div className="h-12 bg-destructive-foreground">bg-ring</div>
      <div className="h-12 bg-muted-foreground">bg-ring</div>
      <div className="h-12 bg-accent-foreground">bg-ring</div>
      <div className="h-12 bg-icon-blue">bg-icon-blue</div>
    </div>
  );
};

export default ColorsTest;
