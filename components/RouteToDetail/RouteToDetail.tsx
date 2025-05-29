"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RouteToDetail = ({ id, children }: { id: number; children?: React.ReactNode; }) => {
    const router = useRouter();

    if (!children) {
        return <Link href={`/detail/${id}`}>Let's cook</Link>;
    }
    else{
        return (
        <div onClick={() => router.push(`/detail/${id}`)}>
            {children}
        </div>
    );
    }
};

export default RouteToDetail;