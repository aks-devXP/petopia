// app/appointment/[kind]/[id].tsx
import React from "react";
import { useLocalSearchParams } from "expo-router";
import AppointmentDetail, { Kind } from "@components/providers/AppointmentDetail";

export default function AppointmentPage() {
    const { kind, id } = useLocalSearchParams<{ kind: Kind; id: string }>();
    return <AppointmentDetail kind={(kind as Kind) || "vet"} id={String(id)} />;
}
