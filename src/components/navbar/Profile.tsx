"use client";
import React from "react";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

const Profile = () => {
  const { toast } = useToast();
  return (
    <Button
      type="button"
      onClick={() => {
        toast({ title: "HEy there", variant: "destructive" });
      }}>
      Toast
    </Button>
  );
};

export default Profile;
