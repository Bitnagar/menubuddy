import supabase from "@/utils/supabase";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  const data = await supabase.from("user").select();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
