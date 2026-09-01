const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

/** "November 05, 2024" */
export function formatLongDate(date: Date): string {
	return new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(date);
}

/** { month: "NOV", day: "05" } for the square date badge. */
export function formatBadgeDate(date: Date): { month: string; day: string } {
	return {
		month: monthFormatter.format(date).toUpperCase(),
		day: String(date.getUTCDate()).padStart(2, '0'),
	};
}

/** True when the event date has already passed (compared at day granularity). */
export function isPast(date: Date): boolean {
	const today = new Date();
	const todayUtc = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
	return date.getTime() < todayUtc;
}
