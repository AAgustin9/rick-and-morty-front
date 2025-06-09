export function getStatusColor(status: string): string {
  switch (status) {
    case "Alive":
      return "bg-green-500"
    case "Dead":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export function getStatusBadgeVariant(status: string): "default" | "destructive" | "secondary" {
  switch (status) {
    case "Alive":
      return "default"
    case "Dead":
      return "destructive"
    default:
      return "secondary"
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
