"use client";
import styles from "./routeToDetail.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const RouteToDetail = ({ id, children }: { id: number; children?: React.ReactNode; }) => {
    const router = useRouter();

    if (!children) {
        return <Link href={`/detail/${id}`} className={styles.link_btn}>
            <p>Let's cook</p>
            <DotLottieReact src="/animate_icon/eggs.lottie" loop autoplay className={styles.cooking_animate} />
        </Link>;
    }
    else{
        return (
        <div className={styles.food_container} onClick={() => router.push(`/detail/${id}`)}>
            {children}
        </div>
    );
    }
};

export default RouteToDetail;