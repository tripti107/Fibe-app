const API_URL = "https://parallelum.com.br/fipe/api/v1/carros/marcas/59/modelos";

export async function fetchCarModels() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch car models");
  }
  const data = await response.json();
  return data.modelos || [];
}