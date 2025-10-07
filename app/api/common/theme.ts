/**
 * Update user theme setting
 * @param theme Theme type "light" | "dark"
 * @returns Promise<ThemeResponse>
 */
export async function updateTheme(theme: "light" | "dark") {
  const response = await fetch("/api/theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ theme }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update theme: ${response.statusText}`);
  }

  return response.json();
}
