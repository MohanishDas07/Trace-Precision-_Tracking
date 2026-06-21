'use client';
import React from 'react';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';
import { createPortal } from 'react-dom';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);

	const links = [
		{
			label: 'Home',
			href: '/',
		},
		{
			label: 'Dashboard',
			href: '/dashboard',
		},
		{
			label: 'Risks Ahead',
			href: '#risks',
		},
	];

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent transition-all duration-300', {
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg shadow-sm':
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-20 w-full max-w-[80rem] items-center justify-between px-8">
				<div className="flex items-center gap-2 p-2">
					<div 
						className="font-serif" 
						style={{ 
							fontWeight: 400, 
							fontSize: '1.875rem', 
							letterSpacing: '-0.025em',
							color: 'white'
						}}
					>
						● Trace<sup style={{ fontSize: '0.6em', verticalAlign: 'super' }}>®</sup>
					</div>
				</div>
				<div className="hidden items-center gap-6 md:flex">
					{links.map((link) => (
						<a key={link.label} className={cn(buttonVariants({ variant: 'ghost' }), "text-[0.875rem] font-medium text-foreground/80 hover:text-foreground")} href={link.href}>
							{link.label}
						</a>
					))}
					<a href="/onboarding">
						<Button className="rounded-full px-6 py-5 ml-2 font-medium bg-white text-black hover:bg-gray-200 hover:scale-105 transition-transform">
							Begin Your Journey
						</Button>
					</a>
				</div>
				<Button
					size="icon"
					variant="outline"
					onClick={() => setOpen(!open)}
					className="md:hidden border-none"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-6" duration={300} />
				</Button>
			</nav>
			<MobileMenu open={open} className="flex flex-col justify-between gap-2 bg-background">
				<div className="grid gap-y-4 pt-8 px-6">
					{links.map((link) => (
						<a
							key={link.label}
							className={buttonVariants({
								variant: 'ghost',
								className: 'justify-start text-xl font-medium',
							})}
							href={link.href}
						>
							{link.label}
						</a>
					))}
				</div>
				<div className="flex flex-col gap-4 p-6">
					<a href="/onboarding" className="w-full">
						<Button className="w-full rounded-full py-6 text-lg bg-white text-black hover:bg-gray-200">
							Begin Your Journey
						</Button>
					</a>
				</div>
			</MobileMenu>
		</header>
	);
}

type MobileMenuProps = React.ComponentProps<'div'> & {
	open: boolean;
};

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-background/95 supports-[backdrop-filter]:bg-background/50 backdrop-blur-lg',
				'fixed top-[80px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t md:hidden',
			)}
		>
			<div
				data-slot={open ? 'open' : 'closed'}
				className={cn(
					'data-[slot=open]:animate-in data-[slot=open]:slide-in-from-top-4 data-[slot=open]:fade-in-0 ease-out duration-300',
					'size-full',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}
