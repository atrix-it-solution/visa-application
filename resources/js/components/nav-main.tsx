import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (title: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(title)) {
                newSet.delete(title);
            } else {
                newSet.add(title);
            }
            return newSet;
        });
    };

    const renderNavItems = (navItems: NavItem[]) => {
        return navItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isActive = page.url.startsWith(
                typeof item.href === 'string' ? item.href : item.href?.url || ''
            );
            const isOpen = openItems.has(item.title);

            return (
                <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                        asChild={!hasChildren} // Only use asChild for links
                        isActive={isActive}
                        tooltip={{ children: item.title }}
                        onClick={hasChildren ? () => toggleItem(item.title) : undefined}
                    >
                        {hasChildren ? (
                            // Use div instead of button for dropdown trigger
                            <div className="flex items-center gap-2 w-full cursor-pointer">
                                {item.icon && <item.icon />}
                                <span className="flex-1 text-left">{item.title}</span>
                                <ChevronDown 
                                    className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                                />
                            </div>
                        ) : (
                            // Regular link
                            <Link href={item.href!} prefetch>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </Link>
                        )}
                    </SidebarMenuButton>
                    
                    {hasChildren && isOpen && (
                        <SidebarMenu className="ml-4">
                            {renderNavItems(item.children!)}
                        </SidebarMenu>
                    )}
                </SidebarMenuItem>
            );
        });
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {renderNavItems(items)}
            </SidebarMenu>
        </SidebarGroup>
    );
}

// import {
//     SidebarGroup,
//     SidebarGroupLabel,
//     SidebarMenu,
//     SidebarMenuButton,
//     SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import { type NavItem } from '@/types';
// import { Link, usePage } from '@inertiajs/react';

// export function NavMain({ items = [] }: { items: NavItem[] }) {
//     const page = usePage();
//     return (
//         <SidebarGroup className="px-2 py-0">
//             <SidebarGroupLabel>Platform</SidebarGroupLabel>
//             <SidebarMenu>
//                 {items.map((item) => (
//                     <SidebarMenuItem key={item.title}>
//                         <SidebarMenuButton
//                             asChild
//                             isActive={page.url.startsWith(
//                                 typeof item.href === 'string'
//                                     ? item.href
//                                     : item.href.url,
//                             )}
//                             tooltip={{ children: item.title }}
//                         >
//                             <Link href={item.href} prefetch>
//                                 {item.icon && <item.icon />}
//                                 <span>{item.title}</span>
//                             </Link>
//                         </SidebarMenuButton>
//                     </SidebarMenuItem>
//                 ))}
//             </SidebarMenu>
//         </SidebarGroup>
//     );
// }
