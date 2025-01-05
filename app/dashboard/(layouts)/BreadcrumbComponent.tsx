'use client'
import { Breadcrumb } from 'antd';
import { usePathname } from 'next/navigation';

export default function BreadcrumbComponent() {
    const pathname = usePathname();

    // Xử lý đường dẫn và chia thành các phần để tạo breadcrumb
    const pathSegments = pathname.split('/').filter(Boolean);

    // Tạo các items cho Breadcrumb
    const breadcrumbItems = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return { title: segment, href: path };
    });

    // Thêm phần đầu (Dashboard) nếu cần
    if (breadcrumbItems.length === 0 || breadcrumbItems[0].title !== 'dashboard') {
        breadcrumbItems.unshift({ title: 'Dashboard', href: '/dashboard' });
    }

    return (
        <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems.map(item => ({
            title: <a href={item.href}>{item.title}</a>
        }))} />
    );
};
